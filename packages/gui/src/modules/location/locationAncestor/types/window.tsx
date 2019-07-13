import {Grid, Button} from "@material-ui/core";
import {Close} from "@material-ui/icons";
import {WindowManager, createModuleView, ModuleReference} from "@adjust/core";
import {LocationAncestorID, LocationAncestor} from "../locationAncestor.type";
import {createModule} from "../../../../module/moduleClassCreator";
import LocationAncestorModule from "../locationAncestor";
import {LocationPath} from "../../_types/LocationPath";
import {React} from "../../../../React";

export const config = {
    initialState: {
        childLocationAncestor: null as LocationAncestor,
    },
    settings: {},
    type: LocationAncestorID,
};

export default class WindowModule extends createModule(config, LocationAncestorModule)
    implements LocationAncestor {
    // The name of this ancestor type to be used in the location path and hints
    protected ancestorName: string = "window";

    // /** @override */
    // public async onInit(): Promise<void> {
    //     // Open the window when it is requested
    //     WindowManager.openWindow(this.getData().id, this.getID());
    // }

    // /** @override */
    // public async onReloadInit(): Promise<void> {
    //     // Open the window when it is requested
    //     WindowManager.openWindow(this.getData().id, this.getID());
    // }

    /** @override */
    async openModule(
        module: ModuleReference,
        location: LocationPath
    ): Promise<LocationPath> {
        // If this module has no child location ancestor yet, obtain it
        if (!this.state.childLocationAncestor) {
            // Get child location ancestor
            const {locationAncestor, path} = await this.getChildLocationAncestorFromPath(
                location
            );

            // Store child location ancestor
            this.setState({
                childLocationAncestor: locationAncestor,
            });

            // Open the module in this location with the potentially newly made path
            return this.state.childLocationAncestor.openModule(module, path);
        } else {
            // Open the module in this location
            return this.state.childLocationAncestor.openModule(module, location);
        }
    }

    /** @override */
    async closeModule(module: ModuleReference, location: LocationPath): Promise<boolean> {
        return false;
    }
}

export class WindowView extends createModuleView(WindowModule) {
    /**
     * Renders the header with the window's controls
     */
    protected renderHeader(): JSX.Element {
        return (
            <Grid container direction="row-reverse">
                <Grid item>
                    <Button>
                        <Close />
                    </Button>
                </Grid>
            </Grid>
        );
    }

    /**@override */
    protected renderView(): JSX.Element {
        return (
            <div>
                {this.renderHeader()}
                {this.state.childLocationAncestor}
            </div>
        );
    }
}

WindowModule.setViewClass(WindowView);
