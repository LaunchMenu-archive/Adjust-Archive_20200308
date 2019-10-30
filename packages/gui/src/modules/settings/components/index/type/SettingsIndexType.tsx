import {createConfig, createModule} from "../../../../../module/moduleClassCreator";
import {createModuleView} from "../../../../../module/moduleViewClassCreator";
import {SettingsIndexType, SettingsIndexTypeType} from "./SettingsIndexType.type";
import {React} from "../../../../../React";
import {Box} from "../../../../../components/Box";

const SettingsIndexTypeConfig = createConfig({
    state: {},
    settings: {},
    type: SettingsIndexTypeType,
});

export class SettingsIndexTypeModule extends createModule(SettingsIndexTypeConfig)
    implements SettingsIndexType {}
export default SettingsIndexTypeModule;

export class SettingsIndexTypeView extends createModuleView(SettingsIndexTypeModule) {
    /** @override */
    public renderView(): JSX.Element {
        return (
            <Box margin="xs" className="package">
                <Box display="flex" flexDirection="row" background="neutralLight">
                    <Box
                        width={40}
                        minWidth={40}
                        height={40}
                        background="themeSecondary"
                        marginRight="xs"></Box>
                    <Box flexGrow={1}>
                        <Box className="name">{this.data.name}</Box>
                        <Box className="description">{this.data.description}</Box>
                    </Box>
                </Box>
            </Box>
        );
    }
}
