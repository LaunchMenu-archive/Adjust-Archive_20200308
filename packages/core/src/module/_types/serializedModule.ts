import {Json} from "../../utils/_types/standardTypes";

/**
 * A type representing the data of a module in its serialized form
 */
export type SerializedModule = {
    $type: string;
    data: {
        request: {
            requestPath: string;
            parent: string;
            data: {[key: string]: Json};
            openView?: boolean;
        };
        parents: string[];
        state: Json;
    };
};
