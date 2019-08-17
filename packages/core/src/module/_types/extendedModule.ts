import {ParameterizedModule, Module} from "../module";
import {ParameterizedModuleConfig} from "./moduleConfig";
import {
    Omit,
    Constructor,
    DeepReadonly,
    GetConstructed,
    Empty,
} from "../../utils/_types/standardTypes";
import {ModuleRequestData, ParameterizedModuleRequestData} from "./moduleRequestData";
import {ContractID} from "../../registry/_types/contractID";
import {SettingsConfig} from "../../storage/settings/_types/settingsConfig";
import {SettingsConfigData} from "../../storage/settings/_types/settingsConfigData";
import {SettingsConfigSetData} from "../../storage/settings/_types/settingsConfigSetData";
import {DataChange} from "../../storage/_types/dataChange";
import {SettingsConditions} from "../../storage/settings/settingsConditions/abstractSettingsConditions";
import {ModuleID} from "../moduleID";
import {ModuleState} from "./moduleState";
import {ModuleProxy} from "../moduleProxy";
import {Settings} from "../../storage/settings/settings";

/**
 * Extracts the state type from a given module
 */
export type ExtractModuleState<
    M extends ParameterizedModule
> = M["state"] extends DeepReadonly<infer S> ? S : never;

/**
 * Extracts the settings type from a given module
 */
export type ExtractModuleSettings<
    M extends ParameterizedModule
> = M["settingsObject"] extends Settings<infer S> ? S : never;

/**
 * Filters out any methods from a module that should be overwritten
 */
export type FilterModule<M extends ParameterizedModule> = Omit<M, "setState">;

/**
 * Extracts the module interface from a given interface ID
 */
export type GetTypeInterface<M extends ContractID<any>> = M extends ContractID<infer I>
    ? I
    : never;

export type OrEmpty<S> = {} extends S ? Empty : S;

/**
 * Creates a new module type, based on a module config and a module type
 */
export type ExtendedModule<
    MC extends ParameterizedModuleConfig,
    M extends ParameterizedModule
> = {
    setState(
        state: DataChange<OrEmpty<MC["initialState"]> & ExtractModuleState<M>>
    ): Promise<void>;
    setSettings(
        settings: DataChange<
            OrEmpty<
                SettingsConfigSetData<MC["settings"]> &
                    SettingsConfigData<ExtractModuleSettings<M>>
            >
        >,
        conditions?: SettingsConditions
    ): Promise<void>;
    getRequest(): ModuleRequestData<GetTypeInterface<MC["type"]>>;
    getParent(): GetTypeInterface<MC["type"]>["parent"];
    getParents(): GetTypeInterface<MC["type"]>["parent"][];
    getData(): GetTypeInterface<MC["type"]>["data"];
} & M &
    // FilterModule<Module<MC["initialState"], MC["settings"], MC["type"]>>;
    Module<
        OrEmpty<MC["initialState"]>,
        SettingsConfig<MC["settings"]>,
        GetTypeInterface<MC["type"]>
    >;

/**
 * Creates a new module constructor type, based on a module config and a module constructor type
 */
export type ExtendedModuleClass<
    MC extends ParameterizedModuleConfig,
    X extends Constructor<any>
> = {
    new (
        request: ParameterizedModuleRequestData,
        moduleID: ModuleID,
        initialState: ModuleState,
        parents: ModuleProxy[]
    ): ExtendedModule<MC, GetConstructed<X>>;
} & typeof Module;
