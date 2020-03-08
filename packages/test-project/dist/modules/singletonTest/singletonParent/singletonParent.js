Object.defineProperty(exports, "__esModule", { value: true });
const gui_1 = require("@adjust/gui");
const singleton_type_1 = require("../singleton/singleton.type");
const singletonParent_type_1 = require("./singletonParent.type");
exports.config = gui_1.createConfig({
    state: {
        singleton: undefined,
        child: undefined,
        text: "test",
    },
    settings: {},
    location: "test",
    defineLocation: {
        ID: "test",
        hints: {
            window: {
                sameAs: "root",
            },
            tab: {
                after: "root",
                ID: "tab1",
            },
        },
    },
    type: singletonParent_type_1.SingletonParentType,
});
class SingletonParentModule extends gui_1.createModule(exports.config) {
    async onInit() {
        const data = this.getData();
        this.changeState({
            text: data.count + "",
            singleton: await this.request({
                type: singleton_type_1.SingletonType,
                data: { text: data.count + "" },
            }),
        });
        if (data.count > 0)
            this.changeState({
                child: await this.request({
                    type: singletonParent_type_1.SingletonParentType,
                    data: { count: data.count - 1 },
                }),
            });
    }
    async createChild() {
        if (!this.state.child)
            this.changeState({
                child: await this.request({
                    type: singletonParent_type_1.SingletonParentType,
                    data: { count: 0 },
                    openView: true,
                }),
            });
    }
    changeText() {
        if (this.state.singleton)
            this.state.singleton.setText(this.state.text + "");
    }
    async closeSingleton() {
        if (this.state.singleton) {
            console.log("close parent");
            await this.state.singleton.close();
            this.changeState({ singleton: null });
        }
    }
}
exports.default = SingletonParentModule;
class SingletonParentView extends gui_1.createModuleView(SingletonParentModule) {
    renderView() {
        return (gui_1.React.createElement("div", null,
            this.state.singleton,
            " ",
            gui_1.React.createElement("button", { onClick: () => this.module.changeText() },
                "set ",
                this.state.text),
            " ",
            gui_1.React.createElement("button", { onClick: () => this.module.closeSingleton() }, "close singleton"),
            " ",
            !this.state.child && (gui_1.React.createElement("button", { onClick: () => this.module.createChild() }, "create child")),
            gui_1.React.createElement("div", { style: { marginLeft: 30 } },
                " ",
                this.state.child)));
    }
}
exports.SingletonParentView = SingletonParentView;
SingletonParentModule.setViewClass(SingletonParentView);
//# sourceMappingURL=singletonParent.js.map