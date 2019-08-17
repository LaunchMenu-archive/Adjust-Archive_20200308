Object.defineProperty(exports, "__esModule", { value: true });
const getAttributes_1 = require("./getAttributes");
/**
 * All the color attributes that accept any color,
 * mapped to either true if the css camelcase name is the same,
 * or a string if it's different
 */
exports.colorsAttributesCustom = {
    backgrounddCustom: "background",
    borderColorCustom: "borderColor",
    borderTopColorCustom: "borderTopColor",
    borderRightColorCustom: "borderRightColor",
    borderBottomColorCUstom: "borderBottomColor",
    borderLeftColorCustom: "borderLeftColor",
    caretColorCustom: "caretColor",
    colorCustom: "color",
    columnRuleColorCustom: "columnRuleColor",
    outlineColorCustom: "outlineColor",
    textDecorationColorCustom: "textDecorationColor",
};
/**
 * All the color attributes that accept only theme colors,
 * mapped to either true if the css camelcase name is the same,
 * or a string if it's different
 */
exports.colorsAttributesTheme = {
    background: true,
    borderColor: true,
    borderTopColor: true,
    borderRightColor: true,
    borderBottomColor: true,
    borderLeftColor: true,
    caretColor: true,
    color: true,
    columnRuleColor: true,
    outlineColor: true,
    textDecorationColor: true,
};
/**
 * All the color attributes,
 * mapped to either true if the css camelcase name is the same,
 * or a string if it's different
 */
exports.colorsAttributes = Object.assign({}, exports.colorsAttributesCustom, exports.colorsAttributesTheme);
/**
 * Retrieves all color attributes their css equivalent, with the value obtained from the theme
 * @param props The props to retrieve the colors from
 * @param theme The theme to get the colors from
 * @returns The css props
 */
function getColorAttributes(props, theme) {
    return getAttributes_1.getAttribute(props, exports.colorsAttributes, (value) => theme.getColor(value) || value);
}
exports.getColorAttributes = getColorAttributes;
//# sourceMappingURL=getColorAttributes.js.map