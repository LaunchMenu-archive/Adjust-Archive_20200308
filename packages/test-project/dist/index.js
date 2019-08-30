var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const fs_1 = __importDefault(require("fs"));
const path_1 = __importDefault(require("path"));
const gui_1 = require("@adjust/gui");
const modules_1 = require("@adjust/gui/modules");
const test_type_1 = require("./modules/test/test.type");
const singletonParent_type_1 = require("./modules/singletonTest/singletonParent/singletonParent.type");
const singleton_type_1 = require("./modules/singletonTest/singleton/singleton.type");
(async () => {
    console.log("loading");
    await gui_1.Registry.loadDefaultClassModuleProviders();
    await gui_1.Registry.loadClassModuleProviders();
    console.log("starting");
    let test = 3;
    if (test == 1) {
        //TODO: reject interfaces that require a parent as the root
        gui_1.Registry.createRoot({ type: test_type_1.TestType }).then(root => {
            setTimeout(() => {
                root.doSomething("3");
            }, 2000);
        });
    }
    else if (test == 2) {
        gui_1.Registry.createRoot({ type: modules_1.LocationManagerType }).then(locationManager => {
            console.log(locationManager, locationManager.getRequestPath());
        });
    }
    else if (test == 3) {
        await gui_1.Registry.createRoot({
            type: singletonParent_type_1.SingletonParentType,
            openView: true,
            data: { count: 1 },
        });
        gui_1.Registry.createRoot({ type: modules_1.SettingsManagerType, openView: true }).then(root => {
            setTimeout(() => {
                root.openView();
            }, 2000);
        });
        // Registry.createRoot({type: TestType, openView: true}).then(root => {
        //     setTimeout(() => {
        //         root.doSomething("3");
        //     }, 2000);
        // });
    }
    else if (test == 4) {
        gui_1.Registry.createRoot({
            type: singletonParent_type_1.SingletonParentType,
            openView: true,
            data: { count: 4 },
        });
        // Export the state to a file
        setTimeout(() => {
            const state = gui_1.ProgramState.serialize();
            fs_1.default.writeFileSync(path_1.default.join(process.cwd(), "data", "stateTest4.json"), JSON.stringify(state, null, 4), "utf8");
        }, 15e3);
    }
    else if (test == 5) {
        // Obtain the state
        const state = JSON.parse(fs_1.default.readFileSync(path_1.default.join(process.cwd(), "data", "stateTest4.json"), "utf8"));
        // Load the state
        gui_1.ProgramState.deserialize(state);
    }
    else if (test == 6) {
        const promises = [];
        promises.push(gui_1.Registry.createRoot({
            type: singleton_type_1.SingletonType,
            openView: true,
            data: { text: "yo" },
        }));
        promises.push(gui_1.Registry.createRoot({
            type: singleton_type_1.SingletonType,
            openView: true,
            data: { text: "yo" },
        }));
        await Promise.all(promises);
    }
})();
function isModule(module) {
    return module instanceof gui_1.ModuleProxy || module instanceof gui_1.Module;
}
//# sourceMappingURL=index.js.map