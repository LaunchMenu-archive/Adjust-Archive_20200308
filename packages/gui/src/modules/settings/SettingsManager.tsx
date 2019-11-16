import {createConfig, createModule} from "../../module/moduleClassCreator";
import {SettingsManagerType, SettingsManager} from "./SettingsManager.type";
import {createModuleView} from "../../module/moduleViewClassCreator";
import {Registry} from "../../registry/registry";
import Path from "path";
import {
    InstanceModuleProvider,
    PackageRetriever,
    ClassModuleProvider,
} from "@adjust/core";
import {ModuleContract} from "@adjust/core/types";
import {ISettingsIndex} from "./_types/ISettingsIndex";
import {ISettingsIndexModuleTree} from "./_types/ISettingsIndexModuleTree";
import {ISettingsIndexTypeTree} from "./_types/ISettingsIndexTypeTree";
import {ISettingsIndexType} from "./_types/ISettingsIndexType";
import {ISettingsIndexModule} from "./_types/ISettingsIndexModule";
import {Module} from "../../module/module";
import {SettingsIndex, SettingsIndexType} from "./components/index/SettingsIndex.type";

const settingsManagerConfig = createConfig({
    state: {
        index: {
            types: [],
            modules: [],
            typesTree: {},
            modulesTree: {},
        } as ISettingsIndex,
        components: {
            index: null as SettingsIndex,
        },
    },
    settings: {},
    type: SettingsManagerType,
});

export class SettingsManagerModule extends createModule(settingsManagerConfig)
    implements SettingsManager {
    /** @override */
    protected async onPreInit(): Promise<void> {
        Registry.addProvider(
            new InstanceModuleProvider(SettingsManagerType, this, () => 2)
        );
    }

    /** @override */
    public async onInit(): Promise<void> {
        await this.retrieveContractTypes();
        await this.retrieveModules();

        const index = await this.request({type: SettingsIndexType});
        await index.setData(this.state.index);
        this.changeState({
            components: {
                index: index,
            },
        });
    }

    // Index retrieval methods
    /**
     * Loads the contract types data into the state
     */
    protected async retrieveContractTypes(): Promise<void> {
        // Get all types
        const contractTypes = await Registry.getContractIDs();

        // Extract their data
        const normalizedContractTypes = contractTypes.map(contractID => {
            const packag = PackageRetriever.requireModulePackage(contractID.ID);
            return {
                ID: contractID.ID,
                type: "contractType" as "contractType",
                package: packag,
                ...contractID.details,
                section:
                    (packag
                        ? packag.name + (contractID.details.section ? "." : "")
                        : "") + contractID.details.section,
            };
        });

        // Format the data into a tree
        const contractTypesTree = {} as any;
        normalizedContractTypes.forEach(contractType => {
            const section = contractType.section.split(".");

            // Create the package if absent
            const packag = section[0];
            if (!contractTypesTree[packag])
                contractTypesTree[packag] = {
                    ...(contractType.package && {
                        name: contractType.package.name,
                        repository: contractType.package.repository,
                        description: contractType.package.description,
                    }),
                    children: {},
                };

            // Add the contract type to the tree
            this.createTreeType(
                contractTypesTree[packag],
                [...section.splice(1), contractType.name],
                contractType
            );
        });

        // Store the data in the state
        this.changeState({
            index: {types: normalizedContractTypes, typesTree: contractTypesTree},
        });
    }

    /**
     * Creates a contract type in the tree at the passed path
     * @param tree The tree to add the field to
     * @param path The path to the field
     * @param value The value to store at the path
     * @modifies tree
     */
    protected createTreeType(
        tree: ISettingsIndexTypeTree,
        path: string[],
        type: ISettingsIndexType
    ) {
        const field = path[0];
        if (field != null) {
            // Make sure the node has a children field
            if (!("children" in tree)) tree["children"] = {};

            // Let ts know tree always has a children field
            if ("children" in tree) {
                let childTree = tree.children[field];
                if (!childTree) childTree = tree.children[field] = {name: field} as any;
                this.createTreeType(childTree, path.slice(1), type);
            }
        } else {
            // Put the type data into the tree node
            Object.assign(tree, type);
        }
    }

    /**
     * Loads the module data into the state
     */
    protected async retrieveModules(): Promise<void> {
        // Get all modules
        const providers = await Registry.getProviders();
        const classProviders: ClassModuleProvider<ModuleContract>[] = [];
        Object.values(providers).forEach(providers =>
            classProviders.push(
                ...(providers.filter(
                    provider => provider instanceof ClassModuleProvider
                ) as any)
            )
        );
        const modulesClasses: typeof Module[] = classProviders.map(provider =>
            provider.getModuleClass()
        );

        // Extract their data
        const normalizedModules = modulesClasses.map(moduleClass => {
            const packag = moduleClass.getPackage();
            const details = moduleClass.getDetails();
            const path = moduleClass.getPath();
            return {
                path,
                package: packag,
                type: "module" as "module",
                ...details,
                name: details.name || path.split(Path.sep).pop(),
                section:
                    (packag ? packag.name + (details.section ? "." : "") : "") +
                    details.section,
            };
        });

        // Format the data into a tree
        const modulesTree = {} as any;
        normalizedModules.forEach(moduleType => {
            const section = moduleType.section.split(".");

            // Create the package if absent
            const packag = section[0];
            if (!modulesTree[packag])
                modulesTree[packag] = {
                    ...(moduleType.package && {
                        name: moduleType.package.name,
                        repository: moduleType.package.repository,
                        description: moduleType.package.description,
                    }),
                    children: {},
                };

            // Add the contract type to the tree
            this.createTreeModule(
                modulesTree[packag],
                [...section.splice(1), moduleType.name],
                moduleType
            );
        });

        // Store the data in the state
        this.changeState({index: {modules: normalizedModules, modulesTree: modulesTree}});
    }

    /**
     * Creates a contract type in the tree at the passed path
     * @param tree The tree to add the field to
     * @param path The path to the field
     * @param value The value to store at the path
     * @modifies tree
     */
    protected createTreeModule(
        tree: ISettingsIndexModuleTree,
        path: string[],
        type: ISettingsIndexModule
    ) {
        const field = path[0];
        if (field != null) {
            // Make sure the node has a children field
            if (!("children" in tree)) tree["children"] = {};

            // Let ts know tree always has a children field
            if ("children" in tree) {
                let childTree = tree.children[field];
                if (!childTree) childTree = tree.children[field] = {name: field} as any;
                this.createTreeModule(childTree, path.slice(1), type);
            }
        } else {
            // Put the type data into the tree node
            Object.assign(tree, type);
        }
    }

    // Child interaction methods
    /** @override */
    public async selectModule(path: string): Promise<void> {
        // TODO: implement
    }

    /** @override */
    public async selectType(path: string): Promise<void> {
        // TODO: implement
    }

    // General interaction methods
    /** @override */
    public async openView(): Promise<void> {
        // TODO: implement
    }

    /** @override */
    public async selectSetting(modulePath: string, settingPath?: string): Promise<void> {
        // TODO: implement
    }
}
export default SettingsManagerModule;

export class SettingsManagerView extends createModuleView(SettingsManagerModule) {
    /** @override */
    public renderView(): JSX.Element {
        return this.state.components.index;
    }
}
