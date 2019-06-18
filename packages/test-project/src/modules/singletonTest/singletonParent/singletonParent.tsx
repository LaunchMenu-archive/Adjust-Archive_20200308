import {React, createModule, createModuleView} from "@adjust/gui";
import {Singleton, SingletonID} from "../singleton/singleton.type";
import {SingletonParentID, SingletonParent} from "./singletonParent.type";
export const config = {
    initialState: {
        singleton: undefined as Singleton,
        child: undefined as SingletonParent,
        text: "test",
    },
    settings: {},
    location: {
        id: "test",
    },
    type: SingletonParentID,
};

export default class SingletonParentModule extends createModule(config)
    implements SingletonParent {
    public async onInit() {
        const data = this.getData();
        this.setState({
            text: data.count + "",
            singleton: await this.request({
                type: SingletonID,
                data: {text: data.count + ""},
            }),
        });

        if (data.count > 0)
            this.setState({
                child: await this.request({
                    type: SingletonParentID,
                    data: {count: data.count - 1},
                }),
            });
    }

    public async createChild() {
        if (!this.state.child)
            this.setState({
                child: await this.request({
                    type: SingletonParentID,
                    data: {count: 0},
                    openView: true,
                }),
            });
    }
    public changeText() {
        if (this.state.singleton) this.state.singleton.setText(this.state.text + "");
    }
    public async closeSingleton() {
        if (this.state.singleton) {
            await this.state.singleton.close();
            this.setState({singleton: null});
        }
    }
}

export class SingletonParentView extends createModuleView(SingletonParentModule) {
    protected renderView(): JSX.Element {
        return (
            <div>
                {this.state.singleton}{" "}
                <button onClick={() => this.module.changeText()}>
                    set {this.state.text}
                </button>{" "}
                <button onClick={() => this.module.closeSingleton()}>
                    close singleton
                </button>{" "}
                {!this.state.child && (
                    <button onClick={() => this.module.createChild()}>
                        create child
                    </button>
                )}
                <div style={{marginLeft: 30}}> {this.state.child}</div>
            </div>
        );
    }
}

SingletonParentModule.setViewClass(SingletonParentView);
