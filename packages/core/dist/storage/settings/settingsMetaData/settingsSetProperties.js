Object.defineProperty(exports, "__esModule", { value: true });
const extendedObject_1 = require("../../../utils/extendedObject");
const settingProperty_1 = require("./settingProperty");
const filterSettingFromSearch_1 = require("./filterSettingFromSearch");
/**
 * A file to manage the properties of a settings file, for usage in GUI
 */
class SettingsSetProperties {
    /**
     * Creates a new instance for a given settings file
     * @param settingsFile The settings file to create the instance for
     * @param conditions The conditions that this instance is for
     */
    constructor(settingsFile, conditions) {
        // A list of properties created through this object
        this.createdProperties = [];
        this.settingsFile = settingsFile;
        this.conditions = conditions;
        this.setupPropertyObject();
    }
    /**
     * Creates the property object
     */
    setupPropertyObject() {
        const map = (settings, path) => {
            if (settings.default !== undefined) {
                return this.getPropertySettingDefinition(path, settings, this.settingsFile, this.conditions);
            }
            else {
                return extendedObject_1.ExtendedObject.map(settings, (value, key) => {
                    if (key == "sectionConfig" || key == "default")
                        return value;
                    return map(value, path ? path + "." + key : key);
                });
            }
        };
        this.propertyObject = map(this.settingsFile.getConfig().settings, "");
    }
    /**
     * Retrieves a normalized version of the passed setting definition
     * @param path The path to the setting
     * @param settingDefiniton A setting definition
     * @returns The normalized version of a setting definition
     */
    static getNormalizedSettingDefinition(path, settingDefiniton) {
        return Object.assign({ constraints: {}, onChange: () => { }, name: path.split(".").pop(), description: null, help: null, helpLink: null, hidden: false, advanced: false, enabled: true, searchExcluded: {
                dependencies: {
                    tags: path + ".tags",
                    name: path + ".name",
                    description: path + ".description",
                },
                searchDependent: true,
                evaluator: filterSettingFromSearch_1.filterSettingFromSearch,
            }, tags: [] }, settingDefiniton);
    }
    /**
     * Retrieves a normalized version of the passed setting definition with all evaluators replaced with `SettingProperty` instances
     * @param path The path to the setting
     * @param settingDefiniton A setting definition
     * @param settingsFile The setting file this definition is an instance of
     * @param conditions The condition to get the properties for
     * @returns The normalized version of a setting definition using `SettingProperty` instances
     */
    getPropertySettingDefinition(path, settingDefiniton, settingsFile, conditions) {
        const normalized = extendedObject_1.ExtendedObject.getClass(this).getNormalizedSettingDefinition(path, settingDefiniton);
        const getProperty = value => {
            let func = ((createNew = false) => {
                if (createNew || !func.cached) {
                    const prop = new settingProperty_1.SettingProperty(path, settingsFile, conditions, value);
                    this.createdProperties.push(prop);
                    if (!createNew)
                        func.cached = prop;
                    return prop;
                }
                return func.cached;
            });
            return func;
        };
        return {
            default: normalized.default,
            type: normalized.type,
            constraints: getProperty(normalized.constraints),
            onChange: normalized.onChange,
            name: getProperty(normalized.name),
            description: getProperty(normalized.description),
            help: getProperty(normalized.help),
            helpLink: getProperty(normalized.helpLink),
            hidden: getProperty(normalized.hidden),
            advanced: getProperty(normalized.advanced),
            enabled: getProperty(normalized.enabled),
            searchExcluded: getProperty(normalized.searchExcluded),
            tags: getProperty(normalized.tags),
        };
    }
    // Getter methods
    /**
     * Retrieves the property getter functions.
     * These functions create new properties when called the first time, and return the same property on later calls.
     * The argument 'true' can be passed to always create a new instance.
     * @returns The getters object.
     */
    getProperties() {
        return this.propertyObject;
    }
    // Maintencance methods
    /**
     * Destroys all properties obtained from this instance
     */
    destroy() {
        this.createdProperties.forEach(property => property.destroy());
    }
}
exports.SettingsSetProperties = SettingsSetProperties;
//# sourceMappingURL=settingsSetProperties.js.map