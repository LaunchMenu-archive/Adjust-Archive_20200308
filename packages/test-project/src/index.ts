import FS from "fs";
import Path from "path";
import {
    Registry,
    Module,
    ParameterizedModule,
    ModuleProxy,
    ProgramState,
} from "@adjust/gui";
import {ContractID} from "@adjust/gui/types";
import {LocationManagerType, SettingsManagerType} from "@adjust/gui/modules";
import {TestType} from "./modules/test/test.type";
import {SingletonParentType} from "./modules/singletonTest/singletonParent/singletonParent.type";
import {SingletonType} from "./modules/singletonTest/singleton/singleton.type";

(async () => {
    console.log("loading");
    await Registry.loadDefaultClassModuleProviders();
    await Registry.loadClassModuleProviders();

    console.log("starting");
    let test = 3;

    if (test == 1) {
        //TODO: reject interfaces that require a parent as the root
        Registry.createRoot({type: TestType}).then(root => {
            setTimeout(() => {
                root.doSomething("3");
            }, 2000);
        });
    } else if (test == 2) {
        Registry.createRoot({type: LocationManagerType}).then(locationManager => {
            console.log(locationManager, (locationManager as any).getRequestPath());
        });
    } else if (test == 3) {
        await Registry.createRoot({
            type: SingletonParentType,
            openView: true,
            data: {count: 1},
        });
        Registry.createRoot({type: SettingsManagerType, openView: true}).then(root => {
            setTimeout(() => {
                root.openView();
            }, 2000);
        });
        // Registry.createRoot({type: TestType, openView: true}).then(root => {
        //     setTimeout(() => {
        //         root.doSomething("3");
        //     }, 2000);
        // });
    } else if (test == 4) {
        const promises = [];
        promises.push(
            Registry.createRoot({
                type: SingletonType,
                openView: true,
                data: {text: "yo"},
            })
        );
        promises.push(
            Registry.createRoot({
                type: SingletonType,
                openView: true,
                data: {text: "yo"},
            })
        );
        await Promise.all(promises);
    }
})();

function isModule(module): module is ParameterizedModule {
    return module instanceof ModuleProxy || module instanceof Module;
}
