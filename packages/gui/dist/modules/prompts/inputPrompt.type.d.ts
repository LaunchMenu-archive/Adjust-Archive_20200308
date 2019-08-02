import { PublicModuleMethods } from "@adjust/core/types";
export declare type PromptData = {
    title?: string;
    description: string;
    placeHolder?: string;
    defaultValue: any;
};
/**
 * A type used to request standard use data
 */
export declare type InputPrompt = {
    /**
     * Requests the user to input some string value
     * @param type The type of input to request
     * @param data The data to use for formatting the prompt
     * @returns The user's input
     */
    prompt(type: "string", data: PromptData & {
        defaultValue: string;
        minLength?: number;
        maxLength?: number;
        pattern?: RegExp;
    }): Promise<string | undefined>;
    /**
     * Requests the user to input some number value
     * @param type The type of input to request
     * @param data The data to use for formatting the prompt
     * @returns The user's input
     */
    prompt(type: "number", data: PromptData & {
        defaultValue: number;
        minValue?: number;
        maxValue?: number;
    }): Promise<number | undefined>;
    /**
     * Requests the user to input some value
     * @param type The type of input to request
     * @param data The data to use for formatting the prompt
     * @returns The user's input
     */
    prompt(type: string, data: PromptData & {
        defaultValue: any;
    } & any): Promise<any | undefined>;
} & PublicModuleMethods;
export declare type InputPromptParent = {};
export declare type InputPromptContract = {
    parent: InputPromptParent;
    child: InputPrompt;
};
export declare const InputPromptID: import("@adjust/core/types").InterfaceID<InputPromptContract>;