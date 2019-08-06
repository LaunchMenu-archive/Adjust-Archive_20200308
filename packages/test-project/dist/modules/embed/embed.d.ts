/// <reference types="react" />
import { Embed } from "./embed.type";
export declare const config: {
    initialState: {
        text: string;
        color: string;
        child: Embed;
    };
    settings: {};
    type: import("@adjust/core/types").InterfaceID<import("./embed.type").EmbedContract>;
};
declare const EmbedModule_base: import("@adjust/core/types").ExtendedModuleClass<{
    initialState: {
        text: string;
        color: string;
        child: Embed;
    };
    settings: {};
    type: import("@adjust/core/types").InterfaceID<import("./embed.type").EmbedContract>;
}, import("@adjust/core/types").ExtendsClass<typeof import("@adjust/gui").Module, import("@adjust/gui").Module>>;
export default class EmbedModule extends EmbedModule_base implements Embed {
    onInit(): Promise<void>;
    onStop(): Promise<void>;
    setText(text: string): Promise<void>;
    /** @override */
    testSomething(): Promise<number>;
    /**
     * Changes the background color
     */
    cycleColor(): void;
}
declare const EmbedView_base: import("@adjust/core/types").ExtendedModuleViewClass<typeof EmbedModule, {}, import("@adjust/core/types").ExtendsClass<typeof import("@adjust/gui").ModuleView, import("@adjust/gui").ModuleView<{}, {}, import("@adjust/core").Module<import("@adjust/core/types").ModuleState, import("@adjust/core/types").SettingsConfig<{}>, import("@adjust/core/types").ModuleInterface>, {}>>>;
export declare class EmbedView extends EmbedView_base {
    protected renderView(): JSX.Element;
}
export {};
