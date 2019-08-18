import {TabHandleType, TabHandle} from "./tabHandle.type";
import {createModule} from "../../../../../../module/moduleClassCreator";
import {createModuleView} from "../../../../../../module/moduleViewClassCreator";
import {React} from "../../../../../../React";
import {Pivot, PivotItem} from "office-ui-fabric-react";

export const tabHandleConfig = {
    initialState: {
        selected: false,
        name: "",
    },
    settings: {},
    type: TabHandleType,
};

export class TabHandleModule extends createModule(tabHandleConfig) implements TabHandle {
    /** @override*/
    public async setName(name: string): Promise<void> {
        this.setState({name});
    }

    /** @override*/
    public async setSelected(selected: boolean): Promise<void> {
        this.setState({selected});
    }

    /** @override*/
    public async remove(): Promise<void> {
        // No settings that require disposal are saved by the module
    }

    /**
     * Selects this tab in the tabs manager
     */
    public async select(): Promise<void> {
        this.getParent().selectTab(this.getData().ID);
    }
}

export default TabHandleModule;

export class TabHandleView extends createModuleView(TabHandleModule) {
    /** @override */
    public renderView(): JSX.Element {
        return (
            <Pivot
                selectedKey={(this.state.selected ? "0" : null) as any}
                headersOnly
                onLinkClick={() => this.module.select()}
                css={{display: "inline-block"}}>
                <PivotItem headerText={this.state.name} itemKey="0" />
            </Pivot>
        );
    }
}
