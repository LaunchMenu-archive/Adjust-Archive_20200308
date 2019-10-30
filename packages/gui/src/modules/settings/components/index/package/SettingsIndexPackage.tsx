import {createConfig, createModule} from "../../../../../module/moduleClassCreator";
import {createModuleView} from "../../../../../module/moduleViewClassCreator";
import {
    SettingsIndexPackage,
    SettingsIndexPackageType,
} from "./SettingsIndexPackage.type";
import {React} from "../../../../../React";
import {Box} from "../../../../../components/Box";
import {
    SettingsIndexCategories,
    SettingsIndexCategoriesType,
} from "../category/SettingsIndexCategories.type";
import {Collapsible} from "../../../../../components/Collapsible";

const SettingsIndexPackageConfig = createConfig({
    state: {
        categories: null as SettingsIndexCategories[],
    },
    settings: {},
    type: SettingsIndexPackageType,
});

export class SettingsIndexPackageModule extends createModule(SettingsIndexPackageConfig)
    implements SettingsIndexPackage {
    public async onInit(fromReload: boolean): Promise<void> {
        this.changeState({
            categories: await Promise.all(
                Object.values(this.getData().children).map(child =>
                    this.request({type: SettingsIndexCategoriesType, data: child})
                )
            ),
        });
    }
}
export default SettingsIndexPackageModule;

export class SettingsIndexPackageView extends createModuleView(
    SettingsIndexPackageModule
) {
    /**
     * Renders the package header itself
     */
    protected renderPackageHeader = () => (
        <Box display="flex" flexGrow={1} flexDirection="row" background="neutralLight">
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
    );

    /** @override */
    public renderView(): JSX.Element {
        return (
            <Box margin="xs" className="package">
                <Collapsible
                    header={this.renderPackageHeader}
                    contents={this.state.categories}
                />
            </Box>
        );
    }
}
