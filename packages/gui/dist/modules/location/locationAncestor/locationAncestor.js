Object.defineProperty(exports, "__esModule", { value: true });
const core_1 = require("@adjust/core");
const locationAncestor_type_1 = require("./locationAncestor.type");
const moduleClassCreator_1 = require("../../../module/moduleClassCreator");
exports.config = {
    initialState: {},
    settings: {},
    type: locationAncestor_type_1.LocationAncestorID,
    abstract: true,
};
/**
 * A base class for location ancestors to extend,
 * provides some common methods that location ancestors might use
 */
class LocationAncestorModule extends moduleClassCreator_1.createModule(exports.config) {
    /**
     * Either gets the next ID from the path, or generates it
     * @param path The location path to get the ID from
     * @returns the obtained or generated ID
     */
    getPathID(path) {
        let id = path.path[0];
        if (!id)
            id = Math.round(Math.random() * 1e5) + "";
        return id;
    }
    /**
     * Gets the child location ancestor given a specified location path
     * @param path The path to obtain the child by
     * @returns The id of the child, as well as the child itself
     */
    async getChildLocationAncestor(path, splits = true) {
        // Get the ID to open
        const id = splits ? this.getPathID(path) : this.getData().id;
        // Request the location
        const locationAncestor = (await this.request({
            type: locationAncestor_type_1.LocationAncestorID,
            use: providers => {
                // Get the index of this module class
                const index = providers.findIndex(p => {
                    const provider = p.provider;
                    if (provider instanceof core_1.ClassModuleProvider)
                        return provider.getModuleClass() == this.getClass();
                });
                // Get the module with the next (lower) index
                const provider = providers[index + 1].provider;
                return [provider];
            },
            data: {
                id: id,
            },
        }))[0];
        // Return the data
        return {
            id,
            locationAncestor,
        };
    }
    async childOpenModule(module, locationPath, child, splits = true) {
        // Open the module in this location
        const childLocationPath = await child.openModule(module, splits
            ? {
                path: locationPath.path.slice(1),
                location: locationPath.location,
            }
            : locationPath);
        // The module should add itself to the obtained path
        // Check if the module's own ID should be appended
        if (splits) {
            const ownID = this.getData().id;
            // Return location path prefixed by own location ID
            return {
                path: [ownID, ...childLocationPath.path],
                location: childLocationPath.location,
            };
        }
        else
            return childLocationPath;
    }
}
exports.default = LocationAncestorModule;
//# sourceMappingURL=locationAncestor.js.map