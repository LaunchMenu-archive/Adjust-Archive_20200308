import { LocationAncestor } from "../../../locationAncestor.type";
import { TabHandle } from "../tabHandle/tabHandle.type";
export declare type Tab = {
    ID: string;
};
export declare type OpenedTab = {
    ID: string;
    tabHandle: Promise<TabHandle>;
    childAncestor: Promise<LocationAncestor>;
    visible: boolean;
};
