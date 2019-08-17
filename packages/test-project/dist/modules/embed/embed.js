Object.defineProperty(exports, "__esModule", { value: true });
const gui_1 = require("@adjust/gui");
const embed_type_1 = require("./embed.type");
const colors = ["orange", "blue", "purple"];
exports.config = {
    initialState: { text: "", color: colors[0], child: null },
    settings: {},
    type: embed_type_1.EmbedType,
};
class EmbedModule extends gui_1.createModule(exports.config) {
    async onInit() {
        const data = this.getData();
        this.setState({
            text: data.text,
        });
        if (data.count > 0)
            this.setState({
                child: await this.request({
                    type: embed_type_1.EmbedType,
                    data: { text: data.text + "t", count: data.count - 1 },
                }),
            });
    }
    async onStop() {
        console.log("stopped");
    }
    async setText(text) {
        this.setState({
            text: text,
        });
        if (this.state.child)
            this.state.child.setText(text + "t");
    }
    /** @override */
    async testSomething() {
        return 3;
    }
    /**
     * Changes the background color
     */
    cycleColor() {
        const colorIndex = colors.indexOf(this.state.color);
        const newColor = colors[(colorIndex + 1) % colors.length];
        this.setState({
            color: newColor,
        });
    }
}
exports.default = EmbedModule;
class EmbedView extends gui_1.createModuleView(EmbedModule) {
    renderView() {
        return (gui_1.React.createElement("div", { style: { color: "white", backgroundColor: this.state.color }, onClick: e => {
                e.stopPropagation();
                this.module.cycleColor();
            } },
            this.state.text,
            gui_1.React.createElement("div", { style: { marginLeft: 30 } },
                " ",
                this.state.child),
            this.state.isStopped && "stopped"));
    }
}
exports.EmbedView = EmbedView;
EmbedModule.setViewClass(EmbedView);
//# sourceMappingURL=embed.js.map