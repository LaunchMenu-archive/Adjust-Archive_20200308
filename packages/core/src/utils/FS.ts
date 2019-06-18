import originalFS from "fs";
import Path from "path";

export const FS = Object.assign(
    {
        mkpathSync: (path: string) => {
            path.split(Path.sep).reduce((path, folder) => {
                const nextPath = Path.join(path, folder, Path.sep);
                if (!FS.existsSync(nextPath)) FS.mkdirSync(nextPath);
                return nextPath;
            }, "");
        },
    },
    originalFS
);
