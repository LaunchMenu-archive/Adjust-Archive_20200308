import {Arguments} from "../../utils/_types/standardTypes";

// A type to remove return values from methods of an object
export type RemoteModule<M> = {[P in keyof M]: ((...args: Arguments<M[P]>) => void)};
