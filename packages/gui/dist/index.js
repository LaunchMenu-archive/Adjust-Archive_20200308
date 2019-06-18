function __export(m) {
    for (var p in m) if (!exports.hasOwnProperty(p)) exports[p] = m[p];
}
Object.defineProperty(exports, "__esModule", { value: true });
__export(require("@adjust/core"));
// Add emotion and MaterialUI for styling
__export(require("@emotion/core"));
var React_1 = require("./React");
exports.React = React_1.React;
__export(require("@material-ui/core"));
// Reolace some standard adjust classes by our extended versions
var registry_1 = require("./registry/registry");
exports.Registry = registry_1.Registry;
var module_1 = require("./module/module");
exports.Module = module_1.Module;
var moduleClassCreator_1 = require("./module/moduleClassCreator");
exports.ModuleClassCreator = moduleClassCreator_1.ModuleClassCreator;
exports.createModule = moduleClassCreator_1.createModule;
//# sourceMappingURL=index.js.map