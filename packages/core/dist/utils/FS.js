var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const fs_1 = __importDefault(require("fs"));
const path_1 = __importDefault(require("path"));
exports.FS = Object.assign({
    mkpathSync: (path) => {
        path.split(path_1.default.sep).reduce((path, folder) => {
            const nextPath = path_1.default.join(path, folder, path_1.default.sep);
            if (!exports.FS.existsSync(nextPath))
                exports.FS.mkdirSync(nextPath);
            return nextPath;
        }, "");
    },
}, fs_1.default);
//# sourceMappingURL=FS.js.map