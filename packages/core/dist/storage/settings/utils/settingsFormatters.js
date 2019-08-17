Object.defineProperty(exports, "__esModule", { value: true });
const extendedObject_1 = require("../../../utils/extendedObject");
/**
 * Maps set of values into the settings format, with the given type
 * @param values The default values
 * @param data The additional data that all settings should have
 * @returns The settings config set
 */
function createSettings(values, data) {
    if (data instanceof Function)
        return extendedObject_1.ExtendedObject.map(values, data);
    return extendedObject_1.ExtendedObject.map(values, v => (Object.assign({}, data, { default: v })));
}
exports.createSettings = createSettings;
//# sourceMappingURL=settingsFormatters.js.map