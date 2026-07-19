#!/usr/bin/env node

import { spawn } from "node:child_process";
import { constants as fsConstants, createReadStream, existsSync } from "node:fs";
import { access, mkdtemp, rm, stat } from "node:fs/promises";
import { createServer } from "node:http";
import { createServer as createTcpServer } from "node:net";
import { dirname, extname, isAbsolute, join, relative, resolve, sep } from "node:path";
import { fileURLToPath } from "node:url";
import { tmpdir } from "node:os";

const REPOSITORY_ROOT = resolve(dirname(fileURLToPath(import.meta.url)), "..");
const HOST = "127.0.0.1";
const STARTUP_TIMEOUT_MS = 15_000;
const PAGE_TIMEOUT_MS = 30_000;

const MIME_TYPES = Object.freeze({
    ".css": "text/css; charset=utf-8",
    ".gif": "image/gif",
    ".html": "text/html; charset=utf-8",
    ".ico": "image/x-icon",
    ".jpeg": "image/jpeg",
    ".jpg": "image/jpeg",
    ".js": "text/javascript; charset=utf-8",
    ".json": "application/json; charset=utf-8",
    ".map": "application/json; charset=utf-8",
    ".mjs": "text/javascript; charset=utf-8",
    ".png": "image/png",
    ".svg": "image/svg+xml",
    ".webp": "image/webp",
    ".woff": "font/woff",
    ".woff2": "font/woff2",
});

function delay(milliseconds) {
    return new Promise((resolvePromise) => setTimeout(resolvePromise, milliseconds));
}

function withTimeout(promise, milliseconds, label) {
    let timeoutId;
    const timeout = new Promise((_, reject) => {
        timeoutId = setTimeout(() => reject(new Error(`${label} timed out after ${milliseconds}ms.`)), milliseconds);
    });
    return Promise.race([promise, timeout]).finally(() => clearTimeout(timeoutId));
}

async function getAvailablePort() {
    const server = createTcpServer();
    await new Promise((resolvePromise, reject) => {
        server.once("error", reject);
        server.listen(0, HOST, resolvePromise);
    });
    const address = server.address();
    const port = typeof address === "object" && address ? address.port : 0;
    await new Promise((resolvePromise, reject) => server.close((error) => error ? reject(error) : resolvePromise()));
    if (!port) {
        throw new Error("Could not reserve a localhost port.");
    }
    return port;
}

function isInsideRepository(filePath) {
    const pathFromRoot = relative(REPOSITORY_ROOT, filePath);
    return pathFromRoot === "" || (!pathFromRoot.startsWith(`..${sep}`) && pathFromRoot !== "..");
}

async function startStaticServer() {
    const server = createServer(async (request, response) => {
        try {
            const requestUrl = new URL(request.url || "/", `http://${HOST}`);
            const decodedPath = decodeURIComponent(requestUrl.pathname);
            const relativePath = decodedPath === "/" ? "index.html" : decodedPath.replace(/^\/+/, "");
            let filePath = resolve(REPOSITORY_ROOT, relativePath);
            if (!isInsideRepository(filePath)) {
                response.writeHead(403, { "content-type": "text/plain; charset=utf-8" });
                response.end("Forbidden");
                return;
            }
            let fileStats = await stat(filePath);
            if (fileStats.isDirectory()) {
                filePath = join(filePath, "index.html");
                if (!isInsideRepository(filePath)) {
                    response.writeHead(403, { "content-type": "text/plain; charset=utf-8" });
                    response.end("Forbidden");
                    return;
                }
                fileStats = await stat(filePath);
            }
            if (!fileStats.isFile()) {
                throw Object.assign(new Error("Not a file"), { code: "ENOENT" });
            }
            response.writeHead(200, {
                "cache-control": "no-store",
                "content-length": fileStats.size,
                "content-type": MIME_TYPES[extname(filePath).toLowerCase()] || "application/octet-stream",
            });
            if (request.method === "HEAD") {
                response.end();
                return;
            }
            const stream = createReadStream(filePath);
            stream.on("error", (error) => response.destroy(error));
            stream.pipe(response);
        } catch (error) {
            const statusCode = error?.code === "ENOENT" || error?.code === "ENOTDIR" ? 404 : 500;
            response.writeHead(statusCode, { "content-type": "text/plain; charset=utf-8" });
            response.end(statusCode === 404 ? "Not found" : "Internal server error");
        }
    });
    await new Promise((resolvePromise, reject) => {
        server.once("error", reject);
        server.listen(0, HOST, resolvePromise);
    });
    const address = server.address();
    const port = typeof address === "object" && address ? address.port : 0;
    if (!port) {
        throw new Error("Static server did not receive a localhost port.");
    }
    return {
        origin: `http://${HOST}:${port}`,
        async close() {
            server.closeAllConnections?.();
            await new Promise((resolvePromise) => server.close(() => resolvePromise()));
        },
    };
}

function findExecutableOnPath(name) {
    const pathEntries = String(process.env.PATH || "").split(process.platform === "win32" ? ";" : ":");
    const extensions = process.platform === "win32"
        ? String(process.env.PATHEXT || ".EXE;.CMD;.BAT").split(";")
        : [""];
    for (const entry of pathEntries) {
        if (!entry) {
            continue;
        }
        for (const extension of extensions) {
            const candidate = join(entry, `${name}${extension}`);
            if (existsSync(candidate)) {
                return candidate;
            }
        }
    }
    return "";
}

async function findChromeExecutable() {
    const environmentCandidates = [process.env.CHROME_BIN, process.env.GOOGLE_CHROME_BIN].filter(Boolean);
    const fixedCandidates = [
        "/Applications/Google Chrome.app/Contents/MacOS/Google Chrome",
        "/Applications/Google Chrome Canary.app/Contents/MacOS/Google Chrome Canary",
        "/usr/bin/google-chrome",
        "/usr/bin/google-chrome-stable",
        "/usr/bin/chromium",
        "/usr/bin/chromium-browser",
    ];
    const pathCandidates = ["google-chrome", "google-chrome-stable", "chromium", "chromium-browser"]
        .map(findExecutableOnPath)
        .filter(Boolean);
    for (const candidate of [...environmentCandidates, ...fixedCandidates, ...pathCandidates]) {
        const resolvedCandidate = isAbsolute(candidate) ? candidate : resolve(candidate);
        try {
            await access(resolvedCandidate, fsConstants.X_OK);
            return resolvedCandidate;
        } catch {
            // Try the next installed browser candidate.
        }
    }
    throw new Error("No installed Chrome/Chromium executable was found. Set CHROME_BIN to run the browser smoke test.");
}

async function waitForDevTools(debugPort, chromeState) {
    const endpoint = `http://${HOST}:${debugPort}/json/version`;
    const deadline = Date.now() + STARTUP_TIMEOUT_MS;
    let lastError = null;
    while (Date.now() < deadline) {
        if (chromeState.exited) {
            throw new Error(
                `Chrome exited before DevTools started (code ${chromeState.code}, signal ${chromeState.signal || "none"}).\n${chromeState.stderr.trim()}`
            );
        }
        try {
            const response = await fetch(endpoint);
            if (response.ok) {
                return response.json();
            }
            lastError = new Error(`DevTools returned HTTP ${response.status}.`);
        } catch (error) {
            lastError = error;
        }
        await delay(100);
    }
    throw new Error(`Chrome DevTools did not start: ${lastError?.message || "unknown error"}`);
}

async function getPageTarget(debugPort) {
    const response = await fetch(`http://${HOST}:${debugPort}/json/list`);
    if (!response.ok) {
        throw new Error(`Could not inspect Chrome targets (HTTP ${response.status}).`);
    }
    const targets = await response.json();
    const pageTarget = targets.find((target) => target.type === "page" && target.webSocketDebuggerUrl);
    if (!pageTarget) {
        throw new Error("Chrome did not expose a page target.");
    }
    return pageTarget;
}

class CdpConnection {
    constructor(webSocket) {
        this.webSocket = webSocket;
        this.nextId = 1;
        this.pending = new Map();
        this.listeners = new Map();
        webSocket.addEventListener("message", (event) => this.handleMessage(event.data));
        webSocket.addEventListener("close", () => {
            const error = new Error("Chrome DevTools connection closed.");
            for (const pendingRequest of this.pending.values()) {
                pendingRequest.reject(error);
            }
            this.pending.clear();
        });
    }

    static async connect(webSocketUrl) {
        const webSocket = new WebSocket(webSocketUrl);
        await withTimeout(new Promise((resolvePromise, reject) => {
            webSocket.addEventListener("open", resolvePromise, { once: true });
            webSocket.addEventListener("error", () => reject(new Error("Could not connect to Chrome DevTools.")), { once: true });
        }), STARTUP_TIMEOUT_MS, "Chrome DevTools WebSocket connection");
        return new CdpConnection(webSocket);
    }

    handleMessage(data) {
        let message;
        try {
            message = JSON.parse(String(data));
        } catch {
            return;
        }
        if (message.id) {
            const pendingRequest = this.pending.get(message.id);
            if (!pendingRequest) {
                return;
            }
            this.pending.delete(message.id);
            if (message.error) {
                pendingRequest.reject(new Error(`CDP ${pendingRequest.method} failed: ${message.error.message}`));
            } else {
                pendingRequest.resolve(message.result || {});
            }
            return;
        }
        const callbacks = this.listeners.get(message.method) || [];
        for (const callback of callbacks) {
            callback(message.params || {});
        }
    }

    on(method, callback) {
        const callbacks = this.listeners.get(method) || [];
        callbacks.push(callback);
        this.listeners.set(method, callbacks);
        return () => {
            const current = this.listeners.get(method) || [];
            this.listeners.set(method, current.filter((candidate) => candidate !== callback));
        };
    }

    waitFor(method) {
        return new Promise((resolvePromise) => {
            const remove = this.on(method, (params) => {
                remove();
                resolvePromise(params);
            });
        });
    }

    send(method, params = {}) {
        const id = this.nextId++;
        const request = new Promise((resolvePromise, reject) => {
            this.pending.set(id, { method, resolve: resolvePromise, reject });
            this.webSocket.send(JSON.stringify({ id, method, params }));
        });
        return withTimeout(request, PAGE_TIMEOUT_MS, `CDP ${method}`);
    }

    close() {
        if (this.webSocket.readyState === WebSocket.OPEN) {
            this.webSocket.close();
        }
    }
}

function remoteObjectText(remoteObject = {}) {
    if (Object.hasOwn(remoteObject, "value")) {
        if (typeof remoteObject.value === "string") {
            return remoteObject.value;
        }
        try {
            return JSON.stringify(remoteObject.value);
        } catch {
            return String(remoteObject.value);
        }
    }
    return remoteObject.description || remoteObject.unserializableValue || remoteObject.type || "unknown";
}

function assertEqual(actual, expected, label) {
    if (actual !== expected) {
        throw new Error(`${label}: expected ${JSON.stringify(expected)}, received ${JSON.stringify(actual)}.`);
    }
}

async function runBrowserAssertions(cdp, pageUrl, origin) {
    const pageIssues = [];
    const requests = new Map();
    cdp.on("Runtime.exceptionThrown", ({ exceptionDetails = {} }) => {
        const description = exceptionDetails.exception?.description || exceptionDetails.text || "Uncaught page exception";
        pageIssues.push(`page exception: ${description}`);
    });
    cdp.on("Runtime.consoleAPICalled", ({ type, args = [] }) => {
        if (type === "error" || type === "warning" || type === "warn") {
            pageIssues.push(`console ${type}: ${args.map(remoteObjectText).join(" ")}`);
        }
    });
    cdp.on("Network.requestWillBeSent", ({ requestId, request = {} }) => {
        requests.set(requestId, request.url || "");
    });
    cdp.on("Network.responseReceived", ({ response = {} }) => {
        try {
            if (new URL(response.url).origin === origin && response.status >= 400) {
                pageIssues.push(`same-origin HTTP ${response.status}: ${response.url}`);
            }
        } catch {
            // Ignore non-URL protocol events.
        }
    });
    cdp.on("Network.loadingFailed", ({ requestId, errorText = "request failed", canceled = false }) => {
        const requestUrl = requests.get(requestId) || "";
        try {
            if (!canceled && requestUrl && new URL(requestUrl).origin === origin) {
                pageIssues.push(`same-origin request failed: ${requestUrl} (${errorText})`);
            }
        } catch {
            // Ignore non-URL protocol events.
        }
    });

    await Promise.all([
        cdp.send("Page.enable"),
        cdp.send("Runtime.enable"),
        cdp.send("Network.enable"),
    ]);
    const loadEvent = cdp.waitFor("Page.loadEventFired");
    const navigation = await cdp.send("Page.navigate", { url: pageUrl });
    if (navigation.errorText) {
        throw new Error(`Page navigation failed: ${navigation.errorText}`);
    }
    await withTimeout(loadEvent, PAGE_TIMEOUT_MS, "Page load");

    const evaluation = await cdp.send("Runtime.evaluate", {
        expression: `
            (async () => {
                const bootstrapPromise = window.__NAWAT_MODULE_BOOTSTRAP_PROMISE__;
                if (!bootstrapPromise || typeof bootstrapPromise.then !== "function") {
                    throw new Error("window.__NAWAT_MODULE_BOOTSTRAP_PROMISE__ is missing.");
                }
                const runtime = await bootstrapPromise;
                await new Promise((resolve) => setTimeout(resolve, 150));
                const scripts = [...document.scripts].map((script) => ({
                    src: script.src,
                    type: String(script.type || "").toLowerCase(),
                }));
                const localScripts = scripts.filter((script) => (
                    script.src && new URL(script.src, location.href).origin === location.origin
                ));
                const passiveResult = typeof window.evaluateClassicalNahuatlVncApplication === "function"
                    ? window.evaluateClassicalNahuatlVncApplication({
                        sourceStem: "chihua",
                        verbClass: "A",
                        sourceValence: "specific-projective",
                        subject: "2pl",
                        objectPerson: "1sg",
                        requestedVoice: "passive",
                    })
                    : null;
                return {
                    localModuleScripts: localScripts.filter((script) => script.type === "module").length,
                    localClassicScripts: localScripts.filter((script) => script.type !== "module").length,
                    bootstrapMode: window.__NAWAT_BOOTSTRAP__?.moduleRuntimeMode || runtime?.moduleRuntimeMode || "",
                    verbPresent: Boolean(document.getElementById("verb")),
                    passiveApiPresent: typeof window.evaluateClassicalNahuatlVncApplication === "function",
                    passive: passiveResult ? {
                        status: passiveResult.authorizationStatus || "",
                        selectedVoice: passiveResult.controlFrame?.selectedVoice || "",
                        formula: passiveResult.resultFrame?.formulaRealization || "",
                        finalKind: passiveResult.resultFrame?.finalTypedVncSlotFrame?.kind || "",
                        selectedKind: passiveResult.resultFrame?.selectedMachineryFrame?.kind || "",
                        typedAuthority: passiveResult.resultFrame?.typedFrameAuthority === true,
                        formulaStringAuthority: passiveResult.resultFrame?.formulaStringAuthority === true,
                    } : null,
                };
            })()
        `,
        awaitPromise: true,
        returnByValue: true,
    });
    if (evaluation.exceptionDetails) {
        const description = evaluation.exceptionDetails.exception?.description || evaluation.exceptionDetails.text;
        throw new Error(`Browser assertion evaluation failed: ${description}`);
    }
    const result = evaluation.result?.value;
    if (!result || typeof result !== "object") {
        throw new Error("Browser assertions did not return a structured result.");
    }
    await cdp.send("Runtime.evaluate", {
        expression: "new Promise((resolve) => setTimeout(resolve, 100))",
        awaitPromise: true,
        returnByValue: true,
    });
    assertEqual(result.localModuleScripts, 1, "local module script count");
    assertEqual(result.localClassicScripts, 0, "local classic script count");
    assertEqual(result.bootstrapMode, "direct-import", "bootstrap runtime mode");
    assertEqual(result.verbPresent, true, "installed #verb control");
    assertEqual(result.passiveApiPresent, true, "public typed VNC application API");
    assertEqual(result.passive?.status, "authorized", "passive chihua authorization");
    assertEqual(result.passive?.selectedVoice, "passive", "passive chihua selected voice");
    assertEqual(result.passive?.formula, "#ni-0(chihua-lo)0+0-0#", "passive chihua formula");
    assertEqual(result.passive?.finalKind, "classical-nahuatl-vnc-slot-frame", "passive chihua final typed frame");
    assertEqual(
        result.passive?.selectedKind,
        "classical-nahuatl-lessons20-22-derived-vnc-machinery-frame",
        "passive chihua selected typed machinery"
    );
    assertEqual(result.passive?.typedAuthority, true, "passive chihua typed-frame authority");
    assertEqual(result.passive?.formulaStringAuthority, false, "passive chihua formula string authority");
    if (pageIssues.length) {
        throw new Error(`Browser emitted forbidden diagnostics:\n- ${pageIssues.join("\n- ")}`);
    }
    return result;
}

async function stopChrome(chromeProcess, chromeState) {
    if (!chromeProcess || chromeState.exited) {
        return;
    }
    chromeProcess.kill("SIGTERM");
    const deadline = Date.now() + 3_000;
    while (!chromeState.exited && Date.now() < deadline) {
        await delay(50);
    }
    if (!chromeState.exited) {
        chromeProcess.kill("SIGKILL");
    }
}

async function main() {
    let staticServer = null;
    let chromeProcess = null;
    let cdp = null;
    let profileDirectory = "";
    const chromeState = { exited: false, code: null, signal: null, stderr: "" };
    try {
        if (typeof WebSocket !== "function") {
            throw new Error("This smoke test requires Node.js 22 or newer with the global WebSocket API.");
        }
        staticServer = await startStaticServer();
        const chromeExecutable = await findChromeExecutable();
        const debugPort = await getAvailablePort();
        profileDirectory = await mkdtemp(join(tmpdir(), "nawat-modern-browser-smoke-"));
        chromeProcess = spawn(chromeExecutable, [
            "--headless=new",
            "--disable-background-networking",
            "--disable-component-update",
            "--disable-default-apps",
            "--disable-dev-shm-usage",
            "--disable-extensions",
            "--disable-features=MediaRouter,Translate",
            "--disable-gpu",
            "--disable-sync",
            "--metrics-recording-only",
            "--no-default-browser-check",
            "--no-first-run",
            `--remote-debugging-port=${debugPort}`,
            `--user-data-dir=${profileDirectory}`,
            "about:blank",
        ], { stdio: ["ignore", "ignore", "pipe"] });
        chromeProcess.stderr.setEncoding("utf8");
        chromeProcess.stderr.on("data", (chunk) => {
            chromeState.stderr = `${chromeState.stderr}${chunk}`.slice(-16_000);
        });
        chromeProcess.once("exit", (code, signal) => {
            chromeState.exited = true;
            chromeState.code = code;
            chromeState.signal = signal;
        });
        chromeProcess.once("error", (error) => {
            chromeState.stderr = `${chromeState.stderr}\n${error.stack || error.message}`;
            chromeState.exited = true;
            chromeState.code = "spawn-error";
        });
        await waitForDevTools(debugPort, chromeState);
        const pageTarget = await getPageTarget(debugPort);
        cdp = await CdpConnection.connect(pageTarget.webSocketDebuggerUrl);
        const pageUrl = `${staticServer.origin}/index.html`;
        const result = await runBrowserAssertions(cdp, pageUrl, staticServer.origin);
        process.stdout.write(`${JSON.stringify({
            status: "passed",
            page: pageUrl,
            moduleScripts: result.localModuleScripts,
            classicScripts: result.localClassicScripts,
            bootstrapMode: result.bootstrapMode,
            verbPresent: result.verbPresent,
            passive: result.passive,
        })}\n`);
    } finally {
        const cleanupErrors = [];
        try {
            cdp?.close();
        } catch (error) {
            cleanupErrors.push(error);
        }
        try {
            await stopChrome(chromeProcess, chromeState);
        } catch (error) {
            cleanupErrors.push(error);
        }
        try {
            if (staticServer) {
                await staticServer.close();
            }
        } catch (error) {
            cleanupErrors.push(error);
        }
        try {
            if (profileDirectory) {
                await rm(profileDirectory, { recursive: true, force: true });
            }
        } catch (error) {
            cleanupErrors.push(error);
        }
        if (cleanupErrors.length) {
            throw new AggregateError(cleanupErrors, "Modern browser smoke cleanup failed.");
        }
    }
}

main().catch((error) => {
    process.stderr.write(`Modern browser smoke failed: ${error.stack || error.message}\n`);
    process.exitCode = 1;
});
