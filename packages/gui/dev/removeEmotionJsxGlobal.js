const FS = require("fs");
const Path = require("path");
const emotionFilePath = Path.join("@emotion", "core", "types", "index.d.ts");

// Obtain the possible node_modules file paths by looking at this modul and up the tree.
const paths = [...module.paths];

// Go through all paths
while (paths.length > 0) {
    let path = paths.shift();
    // Check if the file exists
    path = Path.join(path, emotionFilePath);
    if (FS.existsSync(path)) {
        // Get the file
        let fileContents = FS.readFileSync(path, "utf8");

        // Remove the declaration (3 opening brackets followed by 3 closing brackets,
        // with anything inbetween but brackets)
        fileContents = fileContents.replace(
            /declare global \{[^\{\}]*\{[^\{\}]*\{[^\{\}]*\}[^\{\}]*\}[^\{\}]*\}/,
            ""
        );
        fileContents = fileContents.replace(
            /declare module 'react' \{[^\{\}]*\{[^\{\}]*\}[^\{\}]*\}/,
            ""
        );

        // Write the file
        FS.writeFileSync(path, fileContents, "utf8");
        break;
    }
}
