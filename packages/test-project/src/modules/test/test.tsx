import {createModule, createModuleView, WindowManager, React} from "@adjust/gui";
import {TestType, Test} from "./test.type";
import {EmbedType, Embed} from "../embed/embed.type";

export const config = {
    initialState: {
        stuff: "test",
        children: [] as Embed[],
        somethingAsync: undefined as Promise<number>,
        smth: 0 as number,
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
    type: TestType,
};

export default class TestModule extends createModule(config) implements Test {
    intervalID: number;
    /** @override */
    public async onInit() {
        console.time();
        this.setState({
            children: await this.request({
                type: EmbedType,
                data: {text: "hello", count: 4}, //421},
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
            if (this.state.smth == 0) this.show();
            this.setState({
                smth: (this.state.smth + 1) % 100,
            });
        }, 100) as any;
    }
    public async onStop() {
        clearInterval(this.intervalID);
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
        this.state.children.forEach(child => child.setText("damn"));
    }
    public closeChild() {
        this.state.children.forEach(child => child.close());
    }
    public setStuff() {
        this.setSettings({stuff: true});
        this.setState({
            somethingAsync: new Promise(res => setTimeout(() => res(9), 1000)),
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
                {this.state.children}

                <button onClick={e => this.module.changeChildText()}>
                    Change child text
                </button>
                <button onClick={e => this.module.closeChild()}>Close child</button>
                <button onClick={e => this.module.setStuff()}>
                    Stuff is {this.settings.stuff + " "} {this.state.somethingAsync + 3}
                </button>
                {this.state.smth}
            </div>
        );
    }
}

TestModule.setViewClass(TestView);
