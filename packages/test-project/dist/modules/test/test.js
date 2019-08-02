Object.defineProperty(exports, "__esModule", { value: true });
const gui_1 = require("@adjust/gui");
const test_type_1 = require("./test.type");
const embed_type_1 = require("../embed/embed.type");
exports.config = {
    initialState: {
        stuff: "test",
        child: undefined,
        somethingAsync: undefined,
        smth: 0,
    },
    settings: {
        stuff: {
            default: false,
            type: "boolean",
        },
    },
    type: test_type_1.TestID,
};
class TestModule extends gui_1.createModule(exports.config) {
    /** @override */
    async onInit() {
        this.setState({
            child: await this.request({
                type: embed_type_1.EmbedID,
                data: { text: "hello", count: 3 },
            }),
        });
        this.intervalID = setInterval(() => {
            if (this.state.smth == 0)
                this.show();
            this.setState({
                smth: (this.state.smth + 1) % 100,
            });
        }, 100);
    }
    async onStop() {
        clearInterval(this.intervalID);
    }
    /** @override */
    async testSomething() {
        return 3;
    }
    /** @override */
    async doSomething(stuff) {
        this.setState({ stuff: stuff });
        return "yes";
    }
    changeChildText() {
        if (this.state.child)
            this.state.child.setText("damn");
    }
    closeChild() {
        if (this.state.child)
            this.state.child.close();
    }
    setStuff() {
        this.setSettings({ stuff: true });
        this.setState({
            somethingAsync: new Promise(res => setTimeout(() => res(9), 1000)),
        });
    }
}
exports.default = TestModule;
class TestView extends gui_1.createModuleView(TestModule) {
    renderView() {
        return (gui_1.React.createElement("div", { onClick: e => {
                e.stopPropagation();
                this.module.doSomething("yes");
            } },
            this.state.stuff,
            gui_1.React.createElement("br", null),
            this.state.child,
            gui_1.React.createElement("button", { onClick: e => this.module.changeChildText() }, "Change child text"),
            gui_1.React.createElement("button", { onClick: e => this.module.closeChild() }, "Close child"),
            gui_1.React.createElement("button", { onClick: e => this.module.setStuff() },
                "Stuff is ",
                this.settings.stuff + " ",
                " ",
                this.state.somethingAsync + 3),
            this.state.smth));
    }
}
exports.TestView = TestView;
TestModule.setViewClass(TestView);
//# sourceMappingURL=test.js.map