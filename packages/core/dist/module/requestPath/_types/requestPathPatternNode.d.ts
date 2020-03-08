import { RequestPathNode } from "./requestPathNode";
/**
 * Data used to match a moduleID (a number of times)
 */
export declare type RequestPathPatternNode = {
    pattern: string;
    match: (modulePath: RequestPathNode) => boolean;
    matchTimes: {
        min: number;
        max: number;
    };
    modules: string[];
    priorityWeight: number;
};
