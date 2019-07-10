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
     * Either gets the next ID from the path, or generates it and stores it in the path
     * @param path The location path to get the ID from
     * @returns the obtained or generated ID as well as the passed or updated path
     */
    getPathID(path) {
        let id = path.ancestors[this.ancestorName];
        // If no ID is present, generate and store it
        if (!id) {
            id = Math.round(Math.random() * 1e5) + "";
            path = {
                ancestors: Object.assign({}, path.ancestors, { [this.ancestorName]: id }),
                location: path.location,
            };
        }
        // Return the path and the id
        return { path, id };
    }
    /**
     * Gets the child location ancestor given a specified location path
     * @param inpPath The path to obtain the child by
     * @returns The id of the child, as well as the child itself
     */
    async getChildLocationAncestor(inpPath) {
        // Get the ID to open
        const { id, path } = this.getPathID(inpPath);
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
            path,
            locationAncestor,
        };
    }
}
exports.default = LocationAncestorModule;
//# sourceMappingURL=locationAncestor.js.map