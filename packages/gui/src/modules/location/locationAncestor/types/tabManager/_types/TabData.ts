import {LocationAncestor} from "../../../locationAncestor.type";
import {TabHandle} from "../tabHandle/tabHandle.type";

export type Tab = {ID: string; name: string};

export type OpenedTab = {
    ID: string;
    tabHandle: Promise<TabHandle>;
    childAncestor: Promise<LocationAncestor>;
    closed: boolean;
};
