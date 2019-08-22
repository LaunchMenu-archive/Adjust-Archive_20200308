Object.defineProperty(exports, "__esModule", { value: true });
const singleton_type_1 = require("./singleton.type");
const gui_1 = require("@adjust/gui");
exports.config = {
    initialState: { text: "" },
    settings: {},
    type: singleton_type_1.SingletonType,
};
class SingletonModule extends gui_1.createModule(exports.config) {
    /** @override */
    async onPreInit() {
        gui_1.Registry.addProvider(new gui_1.InstanceModuleProvider(singleton_type_1.SingletonType, this, () => 2));
    }
    /** @override */
    async onInit(fromReload) {
        console.log("singleton created");
        if (!fromReload) {
            const data = this.getData();
            this.setState({
                text: data.text,
            });
        }
    }
    /** @override */
    async onStop() {
        console.log("Singleton stopped");
    }
    /** @override */
    async setText(text) {
        this.setState({
            text: text,
        });
    }
}
exports.default = SingletonModule;
class SingletonView extends gui_1.createModuleView(SingletonModule) {
    renderView() {
        return (gui_1.React.createElement("span", { css: {
                backgroundColor: "purple",
                color: "white",
                padding: 3,
                ":hover": {
                    backgroundColor: "orange",
                },
            } },
            this.state.text,
            this.state.isStopped && "stopped"));
    }
}
exports.SingletonView = SingletonView;
//# sourceMappingURL=singleton.js.map