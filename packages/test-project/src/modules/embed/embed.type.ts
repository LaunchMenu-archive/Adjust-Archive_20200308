import {Registry} from "@adjust/gui";
import {ChildModule, ParentModule} from "@adjust/gui/types";

export type Embed = ChildModule<{
    setText(text: string): Promise<void>;
}>;
export type EmbedParent = ParentModule<{
    testSomething(): Promise<number>;
}>;
export type EmbedContract = {
    parent: EmbedParent;
    child: Embed;
    data: {
        text: string;
        count: number;
    };
};

// Export the type
export const EmbedType = Registry.createContractID<EmbedContract>(__filename);
