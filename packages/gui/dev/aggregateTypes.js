/**
 * A file watcher that aggregates all types that can be found in _types folders,
 * into a single index that can be found at types/index.ts
 */
const chokidar = require("chokidar");
const Path = require("path");
const fs = require("fs");

const typePattern = /^(.*[\\\/]_types[\\\/].*)\.js$/;
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
    const index =
        `export * from "@adjust/core/types";\n` +
        files
            .sort()
            .map(file => `export * from "../${file.replace(/\\/g, "/")}";`)
            .join("\n");
    fs.writeFileSync(Path.join(process.cwd(), "types", "index.d.ts"), index, "utf8");
}
requestFileUpdate();
