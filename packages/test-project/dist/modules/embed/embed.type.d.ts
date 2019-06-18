import { PublicModuleMethods } from "@adjust/gui/types";
export declare type Embed = {
    setText(text: string): Promise<void>;
} & PublicModuleMethods;
export declare type EmbedParent = {
    testSomething(): Promise<number>;
};
export declare type EmbedContract = {
    parent: EmbedParent;
    child: Embed;
    data: {
        text: string;
        count: number;
    };
};
export declare const EmbedID: import("@adjust/gui/types").InterfaceID<EmbedContract>;
