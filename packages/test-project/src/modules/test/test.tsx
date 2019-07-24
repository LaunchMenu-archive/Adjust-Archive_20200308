import {createModule, createModuleView, WindowManager, React} from "@adjust/gui";
import {TestID, Test} from "./test.type";
import {EmbedID, Embed} from "../embed/embed.type";

export const config = {
    initialState: {
        stuff: "test",
        child: undefined as Embed,
        somethingAsync: undefined as Promise<number>,
    },
    settings: {
        stuff: {
            default: false,
            type: "boolean",
        },
    },
    type: TestID,
};

export default class TestModule extends createModule(config) implements Test {
    /** @override */
    public async onInit() {
        this.setState({
            child: await this.request({
                type: EmbedID,
                data: {text: "hello", count: 3},
            }),
        });
    }

    /** @override */
    public async testSomething(): Promise<number> {
        return 3;
    }

    /** @override */
    public async doSomething(stuff: string): Promise<string> {
        this.setState({stuff: stuff});

        return "yes";
    }

    public changeChildText() {
        if (this.state.child) this.state.child.setText("damn");
    }
    public closeChild() {
        if (this.state.child) this.state.child.close();
    }
    public setStuff() {
        this.settingsObject.set.stuff(true);
        this.setState({
            somethingAsync: new Promise(res => setTimeout(() => res(10), 1000)),
        });
    }
}

export class TestView extends createModuleView(TestModule) {
    protected renderView(): JSX.Element {
        return (
            <div
                onClick={e => {
                    e.stopPropagation();
                    this.module.doSomething("yes");
                }}>
                {this.state.stuff}
                <br />
                {this.state.child}

                <button onClick={e => this.module.changeChildText()}>
                    Change child text
                </button>
                <button onClick={e => this.module.closeChild()}>Close child</button>
                <button onClick={e => this.module.setStuff()}>
                    Stuff is {this.settings.stuff + " "} {this.state.somethingAsync}
                </button>
            </div>
        );
    }
}

TestModule.setViewClass(TestView);
