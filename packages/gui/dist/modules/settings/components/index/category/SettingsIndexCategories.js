Object.defineProperty(exports, "__esModule", { value: true });
const moduleClassCreator_1 = require("../../../../../module/moduleClassCreator");
const moduleViewClassCreator_1 = require("../../../../../module/moduleViewClassCreator");
const SettingsIndexCategories_type_1 = require("./SettingsIndexCategories.type");
const React_1 = require("../../../../../React");
const Category_1 = require("./Category");
const core_1 = require("@adjust/core");
const SettingsIndexModule_type_1 = require("../module/SettingsIndexModule.type");
const SettingsIndexType_type_1 = require("../type/SettingsIndexType.type");
const SettingsIndexCategoriesConfig = moduleClassCreator_1.createConfig({
    state: {
        data: null,
    },
    settings: {},
    type: SettingsIndexCategories_type_1.SettingsIndexCategoriesType,
});
class SettingsIndexCategoriesModule extends moduleClassCreator_1.createModule(SettingsIndexCategoriesConfig) {
    /** @override*/
    async onInit() {
        this.changeState({
            data: await this.mapTree(this.getData()),
        });
    }
    /**
     * Maps the leaves of the tree to their module
     * @param tree The tree to map
     * @returns The mapped tree
     */
    async mapTree(tree) {
        const outTree = { name: tree.name };
        if ("children" in tree) {
            const childEntryPromises = core_1.ExtendedObject.entries(tree.children).map(async ([key, child]) => [key, await this.mapTree(child)]);
            outTree.children = core_1.ExtendedObject.fromEntries(await Promise.all(childEntryPromises));
        }
        if ("type" in tree) {
            if (tree.type == "module")
                outTree.module = await this.request({
                    type: SettingsIndexModule_type_1.SettingsIndexModuleType,
                    data: tree,
                });
            else
                outTree.module = await this.request({
                    type: SettingsIndexType_type_1.SettingsIndexTypeType,
                    data: tree,
                });
        }
        return outTree;
    }
}
exports.SettingsIndexCategoriesModule = SettingsIndexCategoriesModule;
exports.default = SettingsIndexCategoriesModule;
class SettingsIndexCategoriesView extends moduleViewClassCreator_1.createModuleView(SettingsIndexCategoriesModule) {
    /** @override */
    renderView() {
        return React_1.React.createElement(Category_1.Category, { data: this.state.data });
    }
}
exports.SettingsIndexCategoriesView = SettingsIndexCategoriesView;
//# sourceMappingURL=SettingsIndexCategories.js.map