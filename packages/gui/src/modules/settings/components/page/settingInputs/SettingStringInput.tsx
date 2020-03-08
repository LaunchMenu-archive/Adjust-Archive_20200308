import {createConfig, createModule} from "../../../../../module/moduleClassCreator";
import {createModuleView} from "../../../../../module/moduleViewClassCreator";
import {React} from "../../../../../React";
import {Box} from "../../../../../components/Box";
import {SettingString, SettingStringType} from "@adjust/core";
import {TextField} from "office-ui-fabric-react";

const SettingsStringInputConfig = createConfig({
    state: {value: ""},
    settings: {},
    type: SettingStringType,
});

export class SettingsStringInputModule extends createModule(SettingsStringInputConfig)
    implements SettingString {
    /** @override */
    public async setValue(value: string): Promise<void> {
        // Updates the value
        this.changeState({value});
    }

    /**
     * Sends the new value to this module's parent
     */
    public updateValue(): void {
        this.getParent().setValue(this.state.value);
    }

    /** @override */
    public async setConstraint(constraint: undefined): Promise<void> {}
}
export default SettingsStringInputModule;

export class SettingsModuleSettingsView extends createModuleView(
    SettingsStringInputModule
) {
    /** @override */
    public renderView(): JSX.Element {
        return (
            <TextField
                label="Standard"
                value={this.state.value}
                onChange={(t, value) => this.module.setValue(value)}
                onBlur={() => this.module.updateValue()}
            />
        );
    }
}
