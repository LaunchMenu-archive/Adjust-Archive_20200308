import { ExtendedObject } from "../../utils/extendedObject";
import { RareObject } from "../../utils/_types/standardTypes";
/**
 * A deep partial type, that stops 'recursion' on anything that it is not a plain object.
 */
export declare type DataChange<T> = RareObject extends T ? {} : T extends object ? T extends Promise<any> ? T : {
    [P in keyof T]?: DataChange<T[P]>;
} & {
    [ExtendedObject.overwrite]?: boolean;
} : T;
