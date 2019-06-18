import {Registry} from "@adjust/gui";
import {PublicModuleMethods} from "@adjust/gui/types";

export type Embed = {
    setText(text: string): Promise<void>;
} & PublicModuleMethods;
export type EmbedParent = {
    testSomething(): Promise<number>;
};
export type EmbedContract = {
    parent: EmbedParent;
    child: Embed;
    data: {
        text: string;
        count: number;
    };
};

// Export the interfaceID type
export const EmbedID = Registry.createInterfaceID<EmbedContract>(__filename);
