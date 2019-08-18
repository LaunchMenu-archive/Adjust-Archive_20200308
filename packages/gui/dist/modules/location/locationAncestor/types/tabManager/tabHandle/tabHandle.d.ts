/// <reference types="react" />
import { TabHandle } from "./tabHandle.type";
export declare const tabHandleConfig: {
    initialState: {
        selected: boolean;
        name: string;
    };
    settings: {};
    type: import("@adjust/core/types").ContractID<import("./tabHandle.type").TabHandleContract>;
};
declare const TabHandleModule_base: import("@adjust/core/types").ExtendedModuleClass<{
    initialState: {
        selected: boolean;
        name: string;
    };
    settings: {};
    type: import("@adjust/core/types").ContractID<import("./tabHandle.type").TabHandleContract>;
}, import("@adjust/core/types").ExtendsClass<typeof import("../../../../../..").Module, import("../../../../../..").Module>>;
export declare class TabHandleModule extends TabHandleModule_base implements TabHandle {
    /** @override*/
    setName(name: string): Promise<void>;
    /** @override*/
    setSelected(selected: boolean): Promise<void>;
    /** @override*/
    remove(): Promise<void>;
    /**
     * Selects this tab in the tabs manager
     */
    select(): Promise<void>;
}
export default TabHandleModule;
declare const TabHandleView_base: import("@adjust/core/types").ExtendedModuleViewClass<typeof TabHandleModule, {}, import("@adjust/core/types").ExtendsClass<typeof import("../../../../../..").ModuleView, import("../../../../../..").ModuleView<{}, {}, import("../../../../../..").Module, {}>>>;
export declare class TabHandleView extends TabHandleView_base {
    /** @override */
    renderView(): JSX.Element;
}
