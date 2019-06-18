import { Arguments } from "../../utils/_types/standardTypes";
export declare type RemoteModule<M> = {
    [P in keyof M]: ((...args: Arguments<M[P]>) => void);
};
