import fs from "fs/promises";
import path from "path";

import { parse } from "@babel/parser";
import traverseModule from "@babel/traverse";
import generateModule from "@babel/generator";
import * as t from "@babel/types";

const traverse = traverseModule.default || traverseModule;
const generate = generateModule.default || generateModule;

const BUILTIN_NAMES = new Set([
    "Array",
    "ArrayBuffer",
    "BigInt",
    "BigInt64Array",
    "BigUint64Array",
    "Boolean",
    "DataView",
    "Date",
    "Error",
    "EvalError",
    "FinalizationRegistry",
    "Float32Array",
    "Float64Array",
    "Function",
    "Infinity",
    "Int8Array",
    "Int16Array",
    "Int32Array",
    "Intl",
    "JSON",
    "Map",
    "Math",
    "NaN",
    "Number",
    "Object",
    "Promise",
    "Proxy",
    "RangeError",
    "ReferenceError",
    "Reflect",
    "RegExp",
    "Set",
    "String",
    "Symbol",
    "SyntaxError",
    "TypeError",
    "URIError",
    "Uint8Array",
    "Uint8ClampedArray",
    "Uint16Array",
    "Uint32Array",
    "WeakMap",
    "WeakSet",
    "console",
    "decodeURI",
    "decodeURIComponent",
    "encodeURI",
    "encodeURIComponent",
    "escape",
    "globalThis",
    "isFinite",
    "isNaN",
    "parseFloat",
    "parseInt",
    "undefined",
]);

function extractPatternIdentifiers(node, names = []) {
    if (t.isIdentifier(node)) {
        names.push(node.name);
        return names;
    }
    if (t.isObjectPattern(node)) {
        node.properties.forEach((property) => {
            if (t.isRestElement(property)) {
                extractPatternIdentifiers(property.argument, names);
                return;
            }
            extractPatternIdentifiers(property.value, names);
        });
        return names;
    }
    if (t.isArrayPattern(node)) {
        node.elements.forEach((element) => {
            if (element) {
                extractPatternIdentifiers(element, names);
            }
        });
        return names;
    }
    if (t.isAssignmentPattern(node)) {
        extractPatternIdentifiers(node.left, names);
        return names;
    }
    if (t.isRestElement(node)) {
        extractPatternIdentifiers(node.argument, names);
    }
    return names;
}

function getTopLevelExports(programNode) {
    const entries = [];
    const seen = new Set();
    programNode.body.forEach((statement) => {
        if (t.isFunctionDeclaration(statement) && statement.id?.name) {
            if (!seen.has(statement.id.name)) {
                seen.add(statement.id.name);
                entries.push({ name: statement.id.name, kind: "function" });
            }
            return;
        }
        if (t.isVariableDeclaration(statement)) {
            statement.declarations.forEach((declaration) => {
                extractPatternIdentifiers(declaration.id).forEach((name) => {
                    if (!seen.has(name)) {
                        seen.add(name);
                        entries.push({ name, kind: statement.kind });
                    }
                });
            });
        }
    });
    return entries;
}

function shouldSkipIdentifier(path) {
    const parent = path.parentPath;
    if (!parent) {
        return true;
    }
    if (path.scope.hasBinding(path.node.name)) {
        return true;
    }
    if (BUILTIN_NAMES.has(path.node.name)) {
        return true;
    }
    if (path.node.name === "targetObject") {
        return true;
    }
    if (
        parent.isMemberExpression({ property: path.node, computed: false })
        || parent.isOptionalMemberExpression?.({ property: path.node, computed: false })
    ) {
        return true;
    }
    if (
        (parent.isObjectProperty() || parent.isObjectMethod())
        && parent.node.key === path.node
        && !parent.node.computed
    ) {
        return true;
    }
    if (
        (parent.isClassMethod() || parent.isClassProperty?.() || parent.isClassPrivateProperty?.())
        && parent.node.key === path.node
        && !parent.node.computed
    ) {
        return true;
    }
    if (
        parent.isLabeledStatement()
        || parent.isBreakStatement()
        || parent.isContinueStatement()
    ) {
        return true;
    }
    return false;
}

function isTargetObjectRewriteCandidate(path) {
    if (shouldSkipIdentifier(path)) {
        return false;
    }
    if (path.isReferencedIdentifier()) {
        return true;
    }
    const parent = path.parentPath;
    if (!parent) {
        return false;
    }
    if (
        (parent.isAssignmentExpression() && path.key === "left")
        || (parent.isUpdateExpression() && path.key === "argument")
        || (parent.isUnaryExpression({ operator: "delete" }) && path.key === "argument")
        || (parent.isForInStatement() && path.key === "left")
        || (parent.isForOfStatement() && path.key === "left")
    ) {
        return true;
    }
    return false;
}

function replaceFreeIdentifiers(ast) {
    traverse(ast, {
        Identifier(path) {
            if (!isTargetObjectRewriteCandidate(path)) {
                return;
            }
            const replacement = t.memberExpression(
                t.identifier("targetObject"),
                t.identifier(path.node.name)
            );
            if (path.parentPath.isObjectProperty() && path.parent.shorthand && path.key === "value") {
                path.parent.shorthand = false;
            }
            path.replaceWith(replacement);
            path.skip();
        },
    });
}

function indentBlock(source, prefix = "    ") {
    return source
        .split("\n")
        .map((line) => (line.length ? `${prefix}${line}` : line))
        .join("\n");
}

function buildModuleSource({
    ast,
    createName,
    installName,
    sourceLabel,
}) {
    const programNode = ast.program;
    if (
        programNode.body[0]
        && t.isExpressionStatement(programNode.body[0])
        && t.isStringLiteral(programNode.body[0].expression, { value: "use strict" })
    ) {
        programNode.body.shift();
    }
    if (Array.isArray(programNode.directives) && programNode.directives.length) {
        programNode.directives = programNode.directives.filter((directive) => directive.value?.value !== "use strict");
    }
    const exportEntries = getTopLevelExports(programNode);
    replaceFreeIdentifiers(ast);
    const transformedBody = generate(programNode, {
        comments: true,
        retainLines: false,
        compact: false,
    }).code.trim();
    const apiLines = ["    const api = {};"];
    exportEntries.forEach(({ name, kind }) => {
        if (kind === "function") {
            apiLines.push(`    api.${name} = ${name};`);
            return;
        }
        if (kind === "const") {
            apiLines.push(
                `    Object.defineProperty(api, ${JSON.stringify(name)}, {`,
                "        configurable: true,",
                "        enumerable: true,",
                `        get() { return ${name}; },`,
                "    });"
            );
            return;
        }
        apiLines.push(
            `    Object.defineProperty(api, ${JSON.stringify(name)}, {`,
            "        configurable: true,",
            "        enumerable: true,",
            `        get() { return ${name}; },`,
            `        set(value) { ${name} = value; },`,
            "    });"
        );
    });
    apiLines.push("    return api;");
    return [
        `// Native wrapper generated from ${sourceLabel}.`,
        "",
        `export function ${createName}(targetObject = globalThis) {`,
        indentBlock(transformedBody),
        "",
        ...apiLines,
        "}",
        "",
        `export function ${installName}(targetObject = globalThis) {`,
        `    const api = ${createName}(targetObject);`,
        "    Object.defineProperties(targetObject, Object.getOwnPropertyDescriptors(api));",
        "    return api;",
        "}",
        "",
    ].join("\n");
}

async function main() {
    const [, , sourcePath, outputPath, createName, installName] = process.argv;
    if (!sourcePath || !outputPath || !createName || !installName) {
        console.error(
            "Usage: node scripts/generate_native_module_wrapper.mjs <source.js> <output.mjs> <createName> <installName>"
        );
        process.exit(1);
    }

    const absoluteSourcePath = path.resolve(sourcePath);
    const source = await fs.readFile(absoluteSourcePath, "utf8");
    const ast = parse(source, {
        sourceType: "script",
        plugins: [
            "optionalChaining",
            "nullishCoalescingOperator",
            "classProperties",
            "logicalAssignment",
            "numericSeparator",
            "objectRestSpread",
        ],
    });
    const moduleSource = buildModuleSource({
        ast,
        createName,
        installName,
        sourceLabel: path.relative(process.cwd(), absoluteSourcePath),
    });
    await fs.writeFile(path.resolve(outputPath), moduleSource, "utf8");
}

main().catch((error) => {
    console.error(error);
    process.exit(1);
});
