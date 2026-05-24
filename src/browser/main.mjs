import { bootstrapBrowserApp } from "../bootstrap/bootstrap.mjs";

const bootstrapPromise = bootstrapBrowserApp();

if (typeof window !== "undefined") {
    window.__NAWAT_MODULE_BOOTSTRAP_PROMISE__ = bootstrapPromise;
}

bootstrapPromise.catch((error) => {
    console.error("Failed to bootstrap module shell.", error);
});

export { bootstrapPromise };
