import {createConfig, createModule} from "../../../../../module/moduleClassCreator";
import {createModuleView} from "../../../../../module/moduleViewClassCreator";
import {SettingsIndexModule, SettingsIndexModuleType} from "./SettingsIndexModule.type";
import {React} from "../../../../../React";
import {Box} from "../../../../../components/Box";

const SettingsIndexModuleConfig = createConfig({
    state: {},
    settings: {},
    type: SettingsIndexModuleType,
});

export class SettingsIndexModuleModule extends createModule(SettingsIndexModuleConfig)
    implements SettingsIndexModule {}
export default SettingsIndexModuleModule;

export class SettingsIndexModuleView extends createModuleView(SettingsIndexModuleModule) {
    /** @override */
    public renderView(): JSX.Element {
        return (
            <Box margin="xs" className="package">
                <Box display="flex" flexDirection="row" background="neutralLight">
                    <Box
                        width={40}
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
