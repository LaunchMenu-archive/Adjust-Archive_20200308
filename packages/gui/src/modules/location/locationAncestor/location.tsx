import {createModule, ModuleReference, createModuleView} from "@adjust/core";
import {React} from "../../../React";
import {LocationPath} from "../_types/LocationPath";
import {LocationAncestorID, LocationAncestor} from "./locationAncestor.type";

export const config = {
    initialState: {
        // The module being displayed
        module: null as ModuleReference,
    },
    getPriority: () => 0.1,
    settings: {},
    type: LocationAncestorID,
};

/**
 * The location class that simply renders a location when requested
 */
export default class LocationModule extends createModule(config)
    implements LocationAncestor {
    //TODO: add list of multiple modules, and a request focus system

    /** @override*/
    async openModule(
        module: ModuleReference,
        locationPath: LocationPath
    ): Promise<LocationPath> {
        this.setState({
            module,
        });
        // Return the path just including this module
        return {
            path: [this.getData().id],
            location: locationPath.location,
        };
    }

    /** @override*/
    async closeModule(
        module: ModuleReference,
        locationPath: LocationPath
    ): Promise<boolean> {
        if (module == this.state.module) {
            this.setState({
                module: null,
            });
            return true;
        }
    }
}

export class LocationView extends createModuleView(LocationModule) {
    protected renderView(): JSX.Element {
        return <div>{this.state.module}</div>;
    }
}
