import FS from "fs";
import Path from "path";
import {
    Registry,
    Module,
    ParameterizedModule,
    ModuleProxy,
    ProgramState,
} from "@adjust/gui";
import {InterfaceID} from "@adjust/gui/types";
import {LocationManagerID} from "@adjust/gui/modules";
import {TestID} from "./modules/test/test.type";
import {SingletonParentID} from "./modules/singletonTest/singletonParent/singletonParent.type";

Registry.loadDefaultClassModuleProviders();
Registry.loadClassModuleProviders();

let test = 3;

if (test == 1) {
    //TODO: reject interfaces that require a parent as the root
    Registry.createRoot({type: TestID}).then(root => {
        setTimeout(() => {
            root.doSomething("3");
        }, 2000);
    });
} else if (test == 2) {
    Registry.createRoot({type: LocationManagerID}).then(locationManager => {
        console.log(locationManager, (locationManager as any).getRequestPath());
    });
} else if (test == 3) {
    Registry.createRoot({
        type: SingletonParentID,
        openView: true,
        data: {count: 4},
    });
} else if (test == 4) {
    Registry.createRoot({
        type: SingletonParentID,
        openView: true,
        data: {count: 4},
    });

    // Export the state to a file
    setTimeout(() => {
        const state = ProgramState.serialize();
        FS.writeFileSync(
            Path.join(process.cwd(), "data", "stateTest4.json"),
            JSON.stringify(state, null, 4),
            "utf8"
        );
    }, 15e3);
} else if (test == 5) {
    // Obtain the state
    const state = JSON.parse(
        FS.readFileSync(Path.join(process.cwd(), "data", "stateTest4.json"), "utf8")
    );

    // Load the state
    ProgramState.deserialize(state);
}

function isModule(module): module is ParameterizedModule {
    return module instanceof ModuleProxy || module instanceof Module;
}
