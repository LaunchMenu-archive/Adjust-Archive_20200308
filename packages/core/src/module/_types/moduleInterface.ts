import {PublicModuleMethods} from "./publicModuleMethods";

/**
 * An interface describing the relation between modules
 */
export interface ModuleInterface {
    parent: {
        [text: string]: (...args: any[]) => Promise<any>;
    };
    child: {
        [P in string]: (
            ...args: any[]
        ) => P extends keyof PublicModuleMethods ? any : Promise<any>
    } &
        PublicModuleMethods;
    data?: any;
}
