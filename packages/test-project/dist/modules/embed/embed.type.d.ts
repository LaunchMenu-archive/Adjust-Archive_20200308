import { ChildModule, ParentModule } from "@adjust/gui/types";
export declare type Embed = ChildModule<{
    setText(text: string): Promise<void>;
}>;
export declare type EmbedParent = ParentModule<{
    testSomething(): Promise<number>;
}>;
export declare type EmbedContract = {
    parent: EmbedParent;
    child: Embed;
    data: {
        text: string;
        count: number;
    };
};
export declare const EmbedType: import("@adjust/gui/types").ContractID<EmbedContract>;
