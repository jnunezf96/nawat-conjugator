export function installDeveloperHooks(hooks = {}, options = {}) {
    const windowObject = options.windowObject || (typeof window !== "undefined" ? window : null);
    if (!windowObject || typeof windowObject !== "object") {
        return { installed: [] };
    }
    const installed = [];
    Object.entries(hooks || {}).forEach(([name, handler]) => {
        if (!name || typeof handler !== "function") {
            return;
        }
        windowObject[name] = handler;
        installed.push(name);
    });
    return { installed };
}
