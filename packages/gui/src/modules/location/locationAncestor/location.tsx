import {
    createModule,
    ModuleReference,
    createModuleView,
    ModuleID,
    UUID,
} from "@adjust/core";
import {React} from "../../../React";
import {DragEvent} from "react";
import {LocationPath} from "../_types/LocationPath";
import {
    LocationAncestorType,
    LocationAncestor,
    dragAndDropName,
} from "./locationAncestor.type";
import {ModuleLocation} from "../../../module/_types/ModuleLocation";
import {Box} from "@material-ui/core";
import LocationAncestorModule from "./locationAncestor";

export const config = {
    initialState: {
        // The modules being displayed
        locations: {} as {
            [locationID: string]: {
                path: LocationPath;
                modules: {ID: string; module: ModuleReference}[];
            };
        },
        modules: [] as ModuleReference[], // The opened modules in order
        draggingModule: null as {
            moduleID: string;
            locationID: string;
            newLocationID: string;
        },
    },
    getPriority: () => 0.1,
    settings: {
        locations: {
            default: [] as string[],
            type: "locations",
        },
    },
    type: LocationAncestorType,
};

/**
 * The location class that simply renders a location when requested
 */
export default class LocationModule extends createModule(config, LocationAncestorModule)
    implements LocationAncestor {
    //TODO: add list of multiple modules, and a request focus system
    // Location management
    /** @override */
    public async createLocation(location: ModuleLocation): Promise<LocationPath> {
        // Add the location to the settings
        if (this.settings.locations.indexOf(location.ID) == -1)
            this.setSettings(
                {
                    locations: [...this.settings.locations, location.ID],
                },
                this.settingsConditions
            );

        // Return the path just including this module
        return {
            nodes: this.getData().path,
            location: location,
        };
    }

    /** @override */
    public async removeLocation(locationPath: LocationPath): Promise<boolean> {
        const locationID = locationPath.location.ID;
        const locData = this.state.locations[locationID];

        // Remove the data from the state if present
        if (locData) {
            this.setState({
                // Keep all modules that weren't present in this location
                modules: this.state.modules.filter(
                    m => locData.modules.find(lm => m.equals(lm.module)) == undefined
                ),
                locations: {
                    [locationID]: undefined,
                },
            });
        }

        // Check if the location existed here
        const contained = this.settings.locations.indexOf(locationID) != -1;

        // Remove the location from the settings
        this.setSettings(
            {
                locations: this.settings.locations.filter(ID => ID != locationID),
            },
            this.settingsConditions
        );

        // Return whether or not the location existed here
        return contained;
    }

    /** @override */
    public async removeAncestor(): Promise<void> {
        this.settingsObject
            .getSettingsFile()
            .removeConditionData(this.settingsConditions);
    }

    // Module management
    /** @override*/
    public async openModule(
        module: ModuleReference,
        locationPath: LocationPath
    ): Promise<LocationPath> {
        const locationID = locationPath.location.ID;
        const locData = this.state.locations[locationID];
        this.setState({
            modules: [module, ...this.state.modules],
            locations: {
                [locationID]: {
                    path: locationPath,
                    modules: [
                        {ID: module.toString(), module},
                        ...(locData ? locData.modules : []),
                    ],
                },
            },
        });

        // Create the location permamantly if it didn't exist already
        return this.createLocation(locationPath.location);
    }

    /** @override*/
    public async closeModule(
        module: ModuleReference,
        locationPath: LocationPath
    ): Promise<boolean> {
        const locationID = locationPath.location.ID;
        const locData = this.state.locations[locationID];
        const l = this.state.modules.length;
        const contains = this.state.modules.find(m => m.equals(module)) != null;
        this.setState({
            modules: this.state.modules.filter(m => !m.equals(module)),
            locations: {
                [locationID]: {
                    path: locationPath,
                    modules: locData
                        ? locData.modules.filter(m => !m.module.equals(module))
                        : [],
                },
            },
        });

        // Return whether or not the location contained the module
        return contains;
    }

    /** @override*/
    public async showModule(
        module: ModuleReference,
        locationPath: LocationPath
    ): Promise<boolean> {
        const contains = this.state.modules.find(m => m.equals(module)) != null;
        if (contains) {
            // Bring the module to the top
            this.setState({
                modules: [module, ...this.state.modules.filter(m => !m.equals(module))],
            });

            // Return whether or not the locatin contains the module, and brought it to the front
            return true;
        }

        // Return that the location didn't contain the module
        return false;
    }

    // Drag and drop methods
    /** @override */
    public async setDropMode(drop: boolean): Promise<void> {
        await super.setDropMode(drop);

        // If we dragged a module that was located here, change its location
        if (!drop && this.state.draggingModule) {
            // Obtain the module from the ID
            const moduleID = new ModuleID(this.state.draggingModule.moduleID);
            const module = moduleID.getModule();

            // Obtain location data and remove it
            const oldLocationID = this.state.draggingModule.locationID;
            const newLocationID = this.state.draggingModule.newLocationID;
            this.setState({
                draggingModule: null,
            });

            // Obtain the ccondition to change the location for TODO: show a GUI fo rthe user to choose
            const condition = undefined;
            // await new Promise(res => setTimeout(res, 0)); // Emulate something async

            // Change the location for the condition
            const so = module.settingsObject;
            try {
                const data = so.getData(condition);
                let currentLocations = (data.get as any).location;
                if (!(currentLocations instanceof Array))
                    currentLocations = [currentLocations];

                // Replace the dragged location by the new location
                await data.changeData({
                    location: [
                        ...currentLocations.filter(
                            loc => loc != oldLocationID && loc != newLocationID
                        ),
                        newLocationID,
                    ],
                });
            } catch (e) {
                console.error(e);
            }
        }
    }

    /**
     * Starts moving a module to another location
     * @param locationID The ID of the location of the module being dragged
     * @param moduleID The ID of the module being dragged
     */
    public async onDragStart(locationID: string, moduleID: string): Promise<void> {
        const newLocationID = UUID.generate();
        const path = this.getData().path;
        this.getParent().setLocationsMoveData({
            locations: [{ID: newLocationID, hints: {path: [...path]}}],
        });
        this.setState({
            draggingModule: {
                moduleID,
                locationID,
                newLocationID,
            },
        });
    }

    /**
     * Handles dropping of a module at this location
     */
    public async onDrop(): Promise<void> {
        // Retrieve the move data
        const parent = this.getParent();
        const currentData = await parent.getLocationsMoveData();

        // Set all hints to a path pointing at this location
        const path = this.getData().path;
        currentData.locations.forEach(loc => {
            loc.hints = {
                path: [...path],
            };
        });

        // Update the data
        await parent.updateLocationsMoveData(currentData);
    }

    /**
     * Moves the locations when the drag ends
     */
    public async onDragEnd(): Promise<void> {
        this.getParent().updateMovedLocations();
    }
}

export class LocationView extends createModuleView(LocationModule) {
    // Drag and drop methods
    /**
     * Starts the dragging of a location
     * @param event The DOM event that starts the dragging
     * @param locationID The location that is dragged from
     * @param module The data of the module being dragged
     */
    protected onDragStart(
        event: DragEvent,
        locationID: string,
        module: {ID: string; module: JSX.Element}
    ): void {
        event.dataTransfer.setData("text", dragAndDropName);
        this.module.onDragStart(locationID, module.ID);
    }

    /**
     * Checks whether this is valid data for a drop
     * @param event The DOM event of the user dragging data
     */
    protected onDragOver(event: DragEvent): void {
        if (this.state.inDropMode) event.preventDefault(); // Allows for dropping
    }

    /**
     * Updates the locations when draging a location finishes
     * @param event The DOM event of the user dragging data
     */
    protected onDragEnd(event: DragEvent): void {
        this.module.onDragEnd();
    }

    /**
     * Handles the dropping of data
     * @param event The DOM event of the user dragging data
     */
    protected onDrop(event: DragEvent): void {
        event.preventDefault(); // Allows for dropping
        const data = event.dataTransfer.getData("text");
        if (data == dragAndDropName && this.state.inDropMode) {
            this.module.onDrop();
        }
    }

    // Rendering methods
    cover = {position: "absolute" as any, left: 0, top: 0, right: 0, bottom: 0};

    /**
     * Renders a daragable box for every module in edit mode
     */
    protected renderModuleBoxes(): JSX.Element[] {
        const boxes = [];
        Object.entries(this.state.locations).forEach(([locationID, location]) => {
            location.modules.forEach(module => {
                boxes.push(
                    <Box
                        mt={1}
                        width="100%"
                        height="30px"
                        bgcolor="blue"
                        color="white"
                        key={module.ID}
                        onDragStart={e => this.onDragStart(e, locationID, module)}
                        onDragOver={e => this.onDragOver(e)}
                        onDrop={e => this.onDrop(e)}
                        onDragEnd={e => this.onDragEnd(e)}
                        draggable>
                        {locationID} {module.ID}
                    </Box>
                );
            });
        });
        return boxes;
    }

    /**@override */
    protected renderView(): JSX.Element {
        return (
            <Box css={this.cover} bgcolor="#ffdddd">
                {this.state.inEditMode && (
                    <Box
                        css={this.cover}
                        p={1}
                        onDragOver={e => this.onDragOver(e)}
                        onDrop={e => this.onDrop(e)}>
                        {this.renderModuleBoxes()}
                    </Box>
                )}
                {this.state.modules[0]}
                {Object.keys(this.state.locations).map(key => (
                    <div key={key}>{key}</div>
                ))}
            </Box>
        );
    }
}
