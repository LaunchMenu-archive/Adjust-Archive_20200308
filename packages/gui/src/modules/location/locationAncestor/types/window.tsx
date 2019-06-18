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
    /** @override */
    onInit() {
        // Open the window when it is requested
        WindowManager.openWindow(this.getData().id, this.getID());
    }

    /** @override */
    onReloadInit() {
        // Open the window when it is requested
        WindowManager.openWindow(this.getData().id, this.getID());
    }

    /** @override */
    async openModule(
        module: ModuleReference,
        location: LocationPath
    ): Promise<LocationPath> {
        if (!this.state.childLocationAncestor) {
            // Get child location ancestor
            const {locationAncestor} = await this.getChildLocationAncestor(
                location,
                false
            );

            // Store child location ancestor
            this.setState({
                childLocationAncestor: locationAncestor,
            });
        }

        // Open the module in this location
        return this.childOpenModule(
            module,
            location,
            this.state.childLocationAncestor,
            false
        );
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
