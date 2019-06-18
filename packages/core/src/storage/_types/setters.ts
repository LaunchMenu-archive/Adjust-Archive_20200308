import {DeepPartial} from "../../utils/_types/standardTypes";

/**
 * Extacts the value objects and maps them to setters functions
 */
export type Setters<C extends object> = {
    [k in keyof C]: C[k] extends object
        ? Setters<C[k]> & ((val: DeepPartial<C[k]>) => Promise<void>)
        : ((val: C[k]) => Promise<void>)
};
