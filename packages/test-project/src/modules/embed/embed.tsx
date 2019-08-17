import {createModule, createModuleView, React} from "@adjust/gui";
import {EmbedType, Embed} from "./embed.type";

const colors = ["orange", "blue", "purple"];
export const config = {
    initialState: {text: "", color: colors[0], child: null as Embed},
    settings: {},
    type: EmbedType,
};

export default class EmbedModule extends createModule(config) implements Embed {
    public async onInit() {
        const data = this.getData();
        this.setState({
            text: data.text,
        });

        if (data.count > 0)
            this.setState({
                child: await this.request({
                    type: EmbedType,
                    data: {text: data.text + "t", count: data.count - 1},
                }),
            });
    }

    public async onStop() {
        console.log("stopped");
    }

    public async setText(text: string) {
        this.setState({
            text: text,
        });
        if (this.state.child) this.state.child.setText(text + "t");
    }

    /** @override */
    public async testSomething(): Promise<number> {
        return 3;
    }

    /**
     * Changes the background color
     */
    public cycleColor(): void {
        const colorIndex = colors.indexOf(this.state.color);
        const newColor = colors[(colorIndex + 1) % colors.length];

        this.setState({
            color: newColor,
        });
    }
}

export class EmbedView extends createModuleView(EmbedModule) {
    protected renderView(): JSX.Element {
        return (
            <div
                style={{color: "white", backgroundColor: this.state.color}}
                onClick={e => {
                    e.stopPropagation();
                    this.module.cycleColor();
                }}>
                {this.state.text}
                <div style={{marginLeft: 30}}> {this.state.child}</div>
                {this.state.isStopped && "stopped"}
                {/* {this.state.child} */}
            </div>
        );
    }
}

EmbedModule.setViewClass(EmbedView);
