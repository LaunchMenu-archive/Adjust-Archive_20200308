import {createConfig, createModule} from "../../../../module/moduleClassCreator";
import {createModuleView} from "../../../../module/moduleViewClassCreator";
import {SettingsIndex, SettingsIndexType} from "./SettingsIndex.type";
import {ISettingsIndex} from "../../_types/ISettingsIndex";
import {
    SettingsIndexPackage,
    SettingsIndexPackageType,
} from "./package/SettingsIndexPackage.type";
import {React} from "../../../../React";
import {Box} from "../../../../components/Box";

const SettingsIndexConfig = createConfig({
    state: {
        types: [] as Promise<SettingsIndexPackage>[],
        modules: [] as Promise<SettingsIndexPackage>[],
    },
    settings: {},
    type: SettingsIndexType,
});

export class SettingsIndexModule extends createModule(SettingsIndexConfig)
    implements SettingsIndex {
    /** @override */
    public async setData(index: ISettingsIndex): Promise<void> {
        // Dispose of the old data
        const disposalPromises = [];
        disposalPromises.push(
            ...this.state.types.map(async type => (await type).close())
        );
        disposalPromises.push(
            ...this.state.modules.map(async modules => (await modules).close())
        );

        // Get the new data
        this.changeState({
            types: Object.values(index.typesTree).map(async packag => {
                return this.request({type: SettingsIndexPackageType, data: packag});
            }),
            modules: Object.values(index.modulesTree).map(async packag => {
                return this.request({type: SettingsIndexPackageType, data: packag});
            }),
        });

        // Await the closing
        await Promise.all(disposalPromises);
    }

    /** @override */
    public async setSearch(search: string): Promise<void> {}
}
export default SettingsIndexModule;

export class SettingsIndexView extends createModuleView(SettingsIndexModule) {
    /** @override */
    public renderView(): JSX.Element {
        return (
            <Box className="settingsIndex">
                <Box className="modules">{this.state.modules}</Box>
                <Box
                    className="types"
                    borderTopStyle="solid"
                    borderTop="xs"
                    borderTopColor="themeDarker">
                    {this.state.types}
                </Box>
            </Box>
        );
    }
}
