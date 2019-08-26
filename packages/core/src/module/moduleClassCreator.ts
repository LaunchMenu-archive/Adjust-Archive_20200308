import {
    ParameterizedModuleConfig,
    ParameterizedNormalizedModuleConfig,
} from "./_types/moduleConfig";
import {
    ModuleSettingsMigrator,
    ModuleSettingsMigrators,
} from "./_types/moduleSettingsMigrators";
import {Constructor, ExtendsClass, Empty} from "../utils/_types/standardTypes";
import {SettingsConfigSet} from "../storage/settings/_types/settingsConfigSet";
import {ExtendedModuleClass} from "./_types/extendedModule";
import {SettingsConfig} from "../storage/settings/_types/settingsConfig";
import {ModuleContract} from "./_types/moduleContract";

import {ExtendedObject} from "../utils/extendedObject";
import {Module} from "./module";
import {Semver} from "../utils/semver";
import {SettingDefinition} from "../storage/settings/_types/settingDefinition";
import {SettingInputContract} from "../storage/settings/settingInputTypes/_types/SettingInput";

export class ModuleClassCreator {
    /**
     * Creates a new class extending the passed class, with a dynamic name
     * @param name The name for the class
     * @param cls The class to extend
     * @returns The newly created class
     */
    protected static createNamedClass<K extends Constructor<any>>(
        name: string,
        cls: K
    ): K {
        return new Function("cls", `return class ${name} extends cls {}`)(cls);
    }

    /**
     * Merges the two migrators
     * @param migrators The migrators to be used
     * @param superMigrators The migrators to merge into the others
     * @returns The resulting migrators
     */
    protected static mergeMigrators(
        migrators: ModuleSettingsMigrators,
        superMigrators: ModuleSettingsMigrators
    ): ModuleSettingsMigrators {
        // Get the migrators in object form
        let migratorEntries: [string, ModuleSettingsMigrator][] = Object.entries(
            migrators
        );
        migratorEntries = migratorEntries.sort(([version1], [version2]) =>
            Semver.isNewer(version1, version2) ? 1 : -1
        );
        let superMigratorEntries: [string, ModuleSettingsMigrator][] = Object.entries(
            superMigrators
        );
        superMigratorEntries = superMigratorEntries.sort(([version1], [version2]) =>
            Semver.isNewer(version1, version2) ? 1 : -1
        );

        // Replace versions in the migrators
        let previousSuperVersion = "0.0.0";
        migratorEntries = migratorEntries.map(([version, migrator]) => {
            // Check if the paren migrator has to be inserted
            if (!(migrator instanceof Function) && typeof migrator.super == "string") {
                // Retrieve the range of super migrators to use
                const rangeStart =
                    superMigratorEntries.findIndex(([v]) => v == previousSuperVersion) +
                    1;
                const endRange = superMigratorEntries.findIndex(
                    ([v]) => v == migrator.super
                );
                const superMigratorsRange = superMigratorEntries.slice(
                    rangeStart,
                    endRange + 1
                );

                // Update the new previousSuperVersion
                previousSuperVersion = migrator.super;

                // Assign the new migrators
                return [
                    version,
                    {
                        main: migrator.main,
                        super: ExtendedObject.fromEntries(superMigratorsRange),
                    },
                ];
            } else {
                return [version, migrator];
            }
        }) as any;

        // Return the resulting object
        return ExtendedObject.fromEntries(migratorEntries);
    }

    /**
     * A function to create a new module class
     * @param config The module config
     * @param module The module to extend
     * @returns The class created from the config data
     */
    public static createModule<
        MC extends ParameterizedModuleConfig,
        // Can't use Module<{}, {}, any> due to it expecting private members
        X extends ExtendsClass<typeof Module, {}> = ExtendsClass<
            typeof Module,
            Module<typeof Module.config.state, SettingsConfig<Empty>, ModuleContract>
        >
    >(config: MC, moduleClass?: X): ExtendedModuleClass<MC, X> {
        // Set the module class to the default module if not specified
        if (!moduleClass) moduleClass = Module as any;

        // Create the class
        const cls = this.createNamedClass((moduleClass as any).name, moduleClass);

        // Get the super config
        const superConfig = (moduleClass as any).getConfig() as ParameterizedModuleConfig;

        // Combine the settings of both configs, giving priority to the new config
        const settings: SettingsConfigSet = ExtendedObject.copyData(
            superConfig.settings,
            {}
        ) as any;
        ExtendedObject.copyData(config.settings, settings);

        // Combine the settings migrators of botth configs
        let settingsMigrators =
            config.settingsMigrators || superConfig.settingsMigrators || {};
        if (config.settingsMigrators && superConfig.settingsMigrators) {
            if (ExtendedObject.isPlainObject(config.settingsMigrators)) {
                // TODO: warn about complex migrator joining
            } else if (!ExtendedObject.isPlainObject(superConfig.settingsMigrators))
                throw Error(
                    "Super module uses custom migrator, automatic migrator merging can not be used, use an advanced migration method instead"
                );
            settingsMigrators = this.mergeMigrators(
                config.settingsMigrators,
                superConfig.settingsMigrators
            );
        }

        // Combine the initial states of both configs, giving priority to the new config
        const state = ExtendedObject.copyData(superConfig.state, {});
        ExtendedObject.copyData(config.state, state);

        // Create the normalized and extended config
        const normalizedConfig: ParameterizedNormalizedModuleConfig = {
            version: config.version,
            details: {
                icon: "",
                name: "",
                description: "",
                section: "",
                ...config.details,
            },
            package: null,
            settings,
            settingsMigrators,
            state: state,
            abstract: config.abstract,
            onInstall: config.onInstall || (() => {}),
            onLoad: config.onLoad || (() => {}),
            type: config.type || superConfig.type,
            viewClass: config.viewClass || superConfig.viewClass,
            getPriority: config.getPriority || superConfig.getPriority || (() => 1),
        };

        // Assign the config to the class
        cls.config = normalizedConfig as any;

        // Return the created class
        return cls as any;
    }

    /**
     * Method may be used to perform typechecking on a config
     * @param config The config to type check
     * @returns A copy of the config
     */
    public static createConfig<T extends ParameterizedModuleConfig>(config: T): T {
        return config;
    }

    /**
     * Method may be used to perform typechecking on a setting
     * @param setting The setting to type check
     * @returns A copy of the setting
     */
    public static createSetting<V, T extends SettingInputContract<V, any>>(
        setting: SettingDefinition<V, T>
    ): SettingDefinition<V, T> {
        return setting;
    }
}

/**
 * A shortcut for the module creation method
 */
export const createModule: (typeof ModuleClassCreator)["createModule"] = ModuleClassCreator.createModule.bind(
    ModuleClassCreator
);

/**
 * A shortcut for the config creation method
 */
export const createConfig: (typeof ModuleClassCreator)["createConfig"] = ModuleClassCreator.createConfig.bind(
    ModuleClassCreator
);

/**
 * A shortcut for the setting creation method
 */
export const createSetting: (typeof ModuleClassCreator)["createSetting"] = ModuleClassCreator.createSetting.bind(
    ModuleClassCreator
);
