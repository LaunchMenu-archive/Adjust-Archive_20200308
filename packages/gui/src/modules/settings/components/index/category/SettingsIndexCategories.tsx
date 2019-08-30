import {createConfig, createModule} from "../../../../../module/moduleClassCreator";
import {createModuleView} from "../../../../../module/moduleViewClassCreator";
import {
    SettingsIndexCategories,
    SettingsIndexCategoriesType,
} from "./SettingsIndexCategories.type";
import {React} from "../../../../../React";
import {Category} from "./Category";
import {ISettingsIndexTypeTree} from "../../../_types/ISettingsIndexTypeTree";
import {ISettingsIndexModuleTree} from "../../../_types/ISettingsIndexModuleTree";
import {ISettingsIndexTreeModules} from "./_types/ISettingsIndexTreeModules";
import {ExtendedObject} from "@adjust/core";
import {SettingsIndexModuleType} from "../module/SettingsIndexModule.type";
import {SettingsIndexTypeType} from "../type/SettingsIndexType.type";

const SettingsIndexCategoriesConfig = createConfig({
    state: {
        data: null as ISettingsIndexTreeModules,
    },
    settings: {},
    type: SettingsIndexCategoriesType,
});

export class SettingsIndexCategoriesModule
    extends createModule(SettingsIndexCategoriesConfig)
    implements SettingsIndexCategories {
    /** @override*/
    protected async onInit(fromReload: boolean): Promise<void> {
        this.changeState({
            data: await this.mapTree(this.getData()),
        });
    }

    /**
     * Maps the leaves of the tree to their module
     * @param tree The tree to map
     * @returns The mapped tree
     */
    protected async mapTree(
        tree: ISettingsIndexTypeTree | ISettingsIndexModuleTree
    ): Promise<ISettingsIndexTreeModules> {
        const outTree: ISettingsIndexTreeModules = {name: tree.name};
        if ("children" in tree) {
            const childEntryPromises = ExtendedObject.entries(tree.children).map(
                async ([key, child]) =>
                    [key, await this.mapTree(child)] as [
                        string,
                        ISettingsIndexTreeModules
                    ]
            );

            outTree.children = ExtendedObject.fromEntries(
                await Promise.all(childEntryPromises)
            );
        }

        if ("type" in tree) {
            if (tree.type == "module")
                outTree.module = await this.request({
                    type: SettingsIndexModuleType,
                    data: tree,
                });
            else
                outTree.module = await this.request({
                    type: SettingsIndexTypeType,
                    data: tree,
                });
        }

        return outTree;
    }
}
export default SettingsIndexCategoriesModule;

export class SettingsIndexCategoriesView extends createModuleView(
    SettingsIndexCategoriesModule
) {
    /** @override */
    public renderView(): JSX.Element {
        return <Category data={this.state.data} />;
    }
}
