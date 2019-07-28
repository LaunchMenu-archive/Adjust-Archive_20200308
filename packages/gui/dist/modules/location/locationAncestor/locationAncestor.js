Object.defineProperty(exports, "__esModule", { value: true });
const core_1 = require("@adjust/core");
const locationAncestor_type_1 = require("./locationAncestor.type");
exports.config = {
    initialState: {
        inEditMode: false,
        inDropMode: false,
    },
    settings: {},
    type: locationAncestor_type_1.LocationAncestorID,
    abstract: true,
};
/**
 * A base class for location ancestors to extend,
 * provides some common methods that location ancestors might use
 * Note that we use adjust core's createModule, since location ancestors shouldn't have any location data themselves
 */
class LocationAncestorModule extends core_1.createModule(exports.config) {
    // Location creation related methods
    /**
     * Either gets the next ID from the path, or generates it and stores it in the path
     * @param path The location path to get the ID from
     * @returns the obtained or generated ID as well as the passed or updated path
     */
    getExtractID(path) {
        let ID = path.nodes[0];
        // If no ID is present, generate and store it
        if (!ID) {
            // ID = Math.round(Math.random() * 1e10) + "";
            ID = "default";
        }
        // Return the path and the id
        return {
            path: Object.assign({}, path, { nodes: path.nodes.slice(1) }),
            ID,
        };
    }
    /**
     * Extracts the relevant hints for this ancestor from a module locatio;n
     * @param location The location and its creation hints
     * @returns Any hints that might have been provided
     */
    getLocationHints(location) {
        if (location.hints) {
            // If there is a path ID node for this ancestor's child in the hints, return it
            const thisPath = this.getData().path || [];
            if (location.hints.path && location.hints.path.length >= thisPath.length)
                return { ID: location.hints.path[thisPath.length] };
            // Otherwise return the hints targeted to this ancestor type
            return location.hints[this.ancestorName] || {};
        }
        // If there are no hints, just return an empty object
        return {};
    }
    /**
     * Gets the child location ancestor given a specified location path
     * @param inpPath The path to obtain the child by
     * @returns The ID of the child, as well as the child itself
     */
    async getChildLocationAncestorFromPath(inpPath) {
        // Get the ID to open
        const { ID, path } = this.getExtractID(inpPath);
        // Get the ancestor itself
        const locationAncestor = await this.getChildLocationAncestor(ID);
        // Return the data
        return {
            ID,
            path,
            locationAncestor,
        };
    }
    /**
     * Gets the child location ancestor given a specified location path
     * @param ID The ID of the child, may be left out if the child has the same ID
     * Leaving it out would result in this instance and child sharing the same ID and path
     * @returns The child ancestor
     */
    async getChildLocationAncestor(ID) {
        // Determine the ID if not present
        const isNewID = ID != undefined;
        if (ID == undefined)
            ID = this.getData().ID;
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
                ID: ID,
                path: isNewID
                    ? [...(this.getData().path || []), ID]
                    : this.getData().path,
            },
        }))[0];
        // Make sure to initialise the correct state
        if (this.state.inEditMode)
            locationAncestor.setEditMode(true);
        if (this.state.inDropMode)
            locationAncestor.setDropMode(true);
        // Return the ancestor
        return locationAncestor;
    }
    // State related methods
    /** @override */
    async setEditMode(edit) {
        await this.setState({ inEditMode: edit });
    }
    /** @override */
    async setDropMode(drop) {
        await this.setState({ inDropMode: drop });
    }
    // Location moving related methods
    /** @override */
    async setLocationsMoveData(data) {
        return this.getParent().setLocationsMoveData(data);
    }
    /** @override */
    async updateLocationsMoveData(data) {
        return this.getParent().updateLocationsMoveData(data);
    }
    /** @override */
    async getLocationsMoveData() {
        return this.getParent().getLocationsMoveData();
    }
    /** @override */
    async getLocationsAtPath(partialPath) {
        return this.getParent().getLocationsAtPath(partialPath);
    }
    /** @override */
    async getModulesAtPath(partialPath) {
        return this.getParent().getModulesAtPath(partialPath);
    }
    /** @override */
    async updateMovedLocations(delay) {
        return this.getParent().updateMovedLocations(delay);
    }
}
exports.default = LocationAncestorModule;
//# sourceMappingURL=locationAncestor.js.map