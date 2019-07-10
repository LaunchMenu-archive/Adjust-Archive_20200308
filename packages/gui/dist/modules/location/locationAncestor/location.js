Object.defineProperty(exports, "__esModule", { value: true });
const core_1 = require("@adjust/core");
const React_1 = require("../../../React");
const locationAncestor_type_1 = require("./locationAncestor.type");
exports.config = {
    initialState: {
        // The module being displayed
        module: null,
    },
    getPriority: () => 0.1,
    settings: {},
    type: locationAncestor_type_1.LocationAncestorID,
};
/**
 * The location class that simply renders a location when requested
 */
class LocationModule extends core_1.createModule(exports.config) {
    //TODO: add list of multiple modules, and a request focus system
    /** @override*/
    async openModule(module, locationPath) {
        this.setState({
            module,
        });
        // Return the path just including this module
        return {
            ancestors: Object.assign({}, locationPath.ancestors, { location: this.getData().id }),
            location: locationPath.location,
        };
    }
    /** @override*/
    async closeModule(module, locationPath) {
        if (module == this.state.module) {
            this.setState({
                module: null,
            });
            return true;
        }
    }
}
exports.default = LocationModule;
class LocationView extends core_1.createModuleView(LocationModule) {
    renderView() {
        return React_1.React.createElement("div", null, this.state.module);
    }
}
exports.LocationView = LocationView;
//# sourceMappingURL=location.js.map