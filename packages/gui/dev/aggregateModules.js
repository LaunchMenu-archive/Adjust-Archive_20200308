/**
 * A file watcher that aggregates all modules that can be found in the dist/modules folder,
 * into a single index that can be found at modules/index.ts
 */
const chokidar = require("chokidar");
const Path = require("path");
const fs = require("fs");

const typePattern = /^(dist[\\\/]modules[\\\/].*)\.js$/;
const files = [];
// Listen for all file chnages
chokidar
    .watch(Path.join(process.cwd(), "dist"), {
        persistent: true,
        cwd: process.cwd(),
    })
    .on("add", path => {
        // Check if it was a type file
        const match = path.match(typePattern);
        if (match) {
            path = match[1];
            if (files.indexOf(path) == -1) {
                files.push(path);
                requestFileUpdate();
            }
        }
    })
    .on("unlink", path => {
        // Check if it was a type file
        const match = path.match(typePattern);
        if (match) {
            path = match[1];
            const index = files.indexOf(path);
            if (index != -1) {
                files.splice(index, 1);
                requestFileUpdate();
            }
        }
    });

let timeoutID;
function requestFileUpdate() {
    clearTimeout(timeoutID);
    timeoutID = setTimeout(updateFile, 10);
}
function updateFile() {
    // Create the typescript index
    const tsIndex = files
        .sort()
        .map(file => `export * from "../${file.replace(/\\/g, "/")}";`)
        .join("\n");
    fs.writeFileSync(Path.join(process.cwd(), "modules", "index.d.ts"), tsIndex, "utf8");

    // Create the js index
    const jsIndex = `function __export(m) {
    for (var p in m) if (!exports.hasOwnProperty(p)) exports[p] = m[p];
}
Object.defineProperty(exports, "__esModule", { value: true });
${files
    .sort()
    .map(file => `__export(require("../${file.replace(/\\/g, "/")}"));`)
    .join("\n")}`;

    fs.writeFileSync(Path.join(process.cwd(), "modules", "index.js"), jsIndex, "utf8");
}
requestFileUpdate();
