import { bootstrapBrowserApp } from "../bootstrap/bootstrap.mjs?v=20260721-classical-public-runtime-001";

const bootstrapPromise = bootstrapBrowserApp();

if (typeof window !== "undefined") {
    window.__NAWAT_MODULE_BOOTSTRAP_PROMISE__ = bootstrapPromise;
}

bootstrapPromise.catch((error) => {
    console.error("Failed to bootstrap the modern module application.", error);
});

export { bootstrapPromise };
