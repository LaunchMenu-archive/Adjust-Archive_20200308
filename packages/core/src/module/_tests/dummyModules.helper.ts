import Path from "path";
import {Registry} from "../../registry/registry";
import {createModule} from "../moduleClassCreator";
import {PublicModuleMethods} from "../_types/publicModuleMethods";

export type dummyInterface = {
    test: (text: string) => Promise<string>;
};
export const dummyInterfaceID = Registry.createInterfaceID<{
    parent: {};
    child: dummyInterface & PublicModuleMethods;
}>(__filename + "1");
export class DummyModule
    extends createModule({initialState: {}, settings: {}, type: dummyInterfaceID})
    implements dummyInterface {
    public async test(text: string): Promise<string> {
        return text;
    }
}
export default DummyModule; // In order to import it as a module from the registry

// @ts-ignore
DummyModule.path = ["", "..", "module", "_tests", "dummyModules.helper.js"].join(
    Path.sep
); // A path that can be imported

export type dummyInterface2 = {
    test2: (test: string) => Promise<void>;
};
export const dummyInterfaceID2 = Registry.createInterfaceID<{
    parent: {someMethod: () => Promise<void>};
    child: dummyInterface2 & PublicModuleMethods;
    data: {shit: string};
}>(__filename + "2");
export class DummyModule2
    extends createModule({initialState: {}, settings: {}, type: dummyInterfaceID2})
    implements dummyInterface2 {
    public async test2(text: string) {
        // Example of type safe detection of what module called it
        const callContext = this.getCallContext();
        if (callContext.isInstanceof(dummyInterfaceID2)) {
            console.log(callContext.test2);
        } else if (callContext.isParentof(this)) {
            console.log(callContext.someMethod);
        }
    }
}
// @ts-ignore
DummyModule2.path = "test2";

export type dummyInterface3 = {
    test2: (test: string) => Promise<void>;
};
export const dummyInterfaceID3 = Registry.createInterfaceID<{
    parent: {};
    child: dummyInterface3 & PublicModuleMethods;
}>(__filename + "3");

export class DummyModule4
    extends createModule({initialState: {}, settings: {}, type: dummyInterfaceID})
    implements dummyInterface {
    public async test(text: string): Promise<string> {
        return text + "4";
    }

    // Just something to identify this class by
    public static something(): boolean {
        return true;
    }
}
// @ts-ignore
DummyModule4.path = "test4";
