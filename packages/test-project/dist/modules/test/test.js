Object.defineProperty(exports, "__esModule", { value: true });
const gui_1 = require("@adjust/gui");
const test_type_1 = require("./test.type");
const embed_type_1 = require("../embed/embed.type");
exports.config = {
    initialState: {
        stuff: "test",
        children: [],
        somethingAsync: undefined,
        smth: 0,
    },
    settings: {
        stuff: {
            default: false,
            type: "boolean",
        },
    },
    defineLocation: {
        ID: "onion",
        hints: {
            window: {
                sameAs: "root",
            },
            tab: {
                after: "root",
                ID: "tab2",
            },
        },
    },
    type: test_type_1.TestType,
};
class TestModule extends gui_1.createModule(exports.config) {
    /** @override */
    async onInit() {
        console.time();
        this.setState({
            children: await this.request({
                type: embed_type_1.EmbedType,
                data: { text: "hello", count: 4 },
            }).then(child => [child]),
        });
        // this.setState({
        //     children: await this.request({
        //         type: EmbedType,
        //         data: {text: "hello", count: 842}, //421},
        //     }).then(child => [child]),
        // });
        // this.setState({
        //     children: await Promise.all(
        //         new Array(840).fill(0).map(() =>
        //             this.request({
        //                 type: EmbedType,
        //                 data: {text: "hello", count: 100}, //421},
        //             })
        //         )
        //     ),
        // });
        console.timeEnd();
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
        this.state.children.forEach(child => child.setText("damn"));
    }
    closeChild() {
        this.state.children.forEach(child => child.close());
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
            this.state.children,
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