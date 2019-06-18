import { LocationManager } from "../modules/location/locationManager.type";
export declare const baseConfig: {
    initialState: {};
    settings: {
        location: {
            default: {
                id: string;
                hint: {};
            };
            type: string;
        };
    };
    type: any;
};
declare const Module_base: import("@adjust/core/types").ExtendedModuleClass<{
    initialState: {};
    settings: {
        location: {
            default: {
                id: string;
                hint: {};
            };
            type: string;
        };
    };
    type: any;
}, import("@adjust/core/types").ExtendsClass<typeof import("@adjust/core").Module, import("@adjust/core").Module<{
    isStopping: boolean;
    isStopped: boolean;
}, {}, import("@adjust/core/types").ModuleInterface>>>;
/**
 * A class containing data for importing it (its actual file location),
 * a state that can be serialized and deserialized,
 * a settings object that stores settings for this type of component
 */
export declare abstract class Module extends Module_base {
    protected locationManager: LocationManager;
    /** @override */
    init(): void;
    /**
     * Opens the module view using the location manager, according to the module's settings
     */
    protected openView(): Promise<void>;
}
export {};
