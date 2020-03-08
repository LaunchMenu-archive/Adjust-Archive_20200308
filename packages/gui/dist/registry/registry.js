var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const path_1 = __importDefault(require("path"));
const core_1 = require("@adjust/core");
// TODO: think of a better way to handle singleton patterns and extendability in Adjust
const loadDefaultClassModuleProviders = core_1.Registry.loadDefaultClassModuleProviders.bind(core_1.Registry);
core_1.Registry.__proto__.loadDefaultClassModuleProviders = async function (filter = () => true) {
    await loadDefaultClassModuleProviders();
    await this.loadClassModuleProviders(path_1.default.join(__dirname, "..", "modules"), "gui", filter);
};
exports.Registry = core_1.Registry;
//# sourceMappingURL=registry.js.map