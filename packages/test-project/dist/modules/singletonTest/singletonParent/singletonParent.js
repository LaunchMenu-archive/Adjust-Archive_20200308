Object.defineProperty(exports, "__esModule", { value: true });
const gui_1 = require("@adjust/gui");
const singleton_type_1 = require("../singleton/singleton.type");
const singletonParent_type_1 = require("./singletonParent.type");
exports.config = {
    initialState: {
        singleton: undefined,
        child: undefined,
        text: "test",
    },
    settings: {},
    location: {
        id: "test",
    },
    type: singletonParent_type_1.SingletonParentID,
};
class SingletonParentModule extends gui_1.createModule(exports.config) {
    async onInit() {
        const data = this.getData();
        this.setState({
            text: data.count + "",
            singleton: await this.request({
                type: singleton_type_1.SingletonID,
                data: { text: data.count + "" },
            }),
        });
        if (data.count > 0)
            this.setState({
                child: await this.request({
                    type: singletonParent_type_1.SingletonParentID,
                    data: { count: data.count - 1 },
                }),
            });
    }
    async createChild() {
        if (!this.state.child)
            this.setState({
                child: await this.request({
                    type: singletonParent_type_1.SingletonParentID,
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
            await this.state.singleton.close();
            this.setState({ singleton: null });
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