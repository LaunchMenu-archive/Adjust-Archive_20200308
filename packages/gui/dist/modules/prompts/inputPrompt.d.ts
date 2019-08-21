import { KeyboardEvent } from "react";
import { InputPrompt, PromptData } from "./inputPrompt.type";
export declare const config: {
    initialState: {
        type: string;
        title: string;
        description: string;
        placeHolder: string;
        errorMessage: string;
        value: any;
    };
    settings: {};
    defineLocation: {
        ID: string;
        hints: {
            window: {
                new: boolean;
                name: string;
                width: number;
                height: number;
            };
        };
    };
    type: import("@adjust/core/types").ContractID<import("./inputPrompt.type").InputPromptContract>;
};
declare const InputPromptModule_base: import("@adjust/core/types").ExtendedModuleClass<{
    initialState: {
        type: string;
        title: string;
        description: string;
        placeHolder: string;
        errorMessage: string;
        value: any;
    };
    settings: {};
    defineLocation: {
        ID: string;
        hints: {
            window: {
                new: boolean;
                name: string;
                width: number;
                height: number;
            };
        };
    };
    type: import("@adjust/core/types").ContractID<import("./inputPrompt.type").InputPromptContract>;
}, import("@adjust/core/types").ExtendsClass<typeof import("../..").Module, import("../..").Module>>;
export default class InputPromptModule extends InputPromptModule_base implements InputPrompt {
    protected callback: (value: any) => void;
    protected constraints: {
        minLength?: number;
        maxLength?: number;
        pattern?: RegExp;
        minValue?: number;
        maxValue?: number;
    };
    /** @override */
    prompt(type: string, data: PromptData & {
        defaultValue: any;
        minLength?: number;
        maxLength?: number;
        pattern?: RegExp;
        minValue?: number;
        maxValue?: number;
    }): Promise<any | undefined>;
    /**
     * Resolves any open standing prompt
     * @param value The value to resolve the prompt with, uses value from state if absent
     */
    resolve(value?: any): void;
    /**
     * Sets the input value
     * @param value The value that is currently chosen
     */
    setValue(value: any): void;
    /** @override */
    onClose(): Promise<void>;
}
declare const InputPromptView_base: import("@adjust/core/types").ExtendedModuleViewClass<typeof InputPromptModule, {}, import("@adjust/core/types").ExtendsClass<typeof import("@adjust/core").ModuleView, import("@adjust/core").ModuleView<{}, {}, import("@adjust/core").Module<import("@adjust/core/types").ModuleState, import("@adjust/core/types").SettingsConfig<any>, import("@adjust/core/types").ModuleContract>, {}>>>;
export declare class InputPromptView extends InputPromptView_base {
    /**
     * Handles keyboard events
     * @param event The keyboard event
     */
    protected keyEvent(event: KeyboardEvent<HTMLElement>): void;
    /**@override */
    protected renderView(): JSX.Element;
}
export {};
