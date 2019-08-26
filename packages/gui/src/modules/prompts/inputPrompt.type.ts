import {Registry} from "@adjust/core";
import {ChildModule, ParentModule} from "@adjust/core/types";

export type PromptData = {
    title?: string;
    description: string;
    placeHolder?: string;
    defaultValue: any;
};

/**
 * A type used to request simple data from the user
 */
export type InputPrompt = ChildModule<{
    //TODO: add more types, look icon options and the likes
    /**
     * Requests the user to input some string value
     * @param type The type of input to request
     * @param data The data to use for formatting the prompt
     * @returns The user's input
     */
    prompt(
        type: "string",
        data: PromptData & {
            defaultValue: string;
            minLength?: number;
            maxLength?: number;
            pattern?: RegExp;
        }
    ): Promise<string | undefined>;

    /**
     * Requests the user to input some number value
     * @param type The type of input to request
     * @param data The data to use for formatting the prompt
     * @returns The user's input
     */
    prompt(
        type: "number",
        data: PromptData & {defaultValue: number; minValue?: number; maxValue?: number}
    ): Promise<number | undefined>;

    /**
     * Requests the user to input some value
     * @param type The type of input to request
     * @param data The data to use for formatting the prompt
     * @returns The user's input
     */
    prompt(
        type: string,
        data: PromptData & {defaultValue: any} & any
    ): Promise<any | undefined>;
}>;
export type InputPromptParent = ParentModule<{}>;
export type InputPromptContract = {
    parent: InputPromptParent;
    child: InputPrompt;
};

// Export the inputPromptID type
export const InputPromptType = Registry.createContractID<InputPromptContract>(__filename);
