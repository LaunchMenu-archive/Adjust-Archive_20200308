Object.defineProperty(exports, "__esModule", { value: true });
const getAttributes_1 = require("./getAttributes");
/**
 * All the spacing attributes that accept any spacing,
 * mapped to either true if the css camelcase name is the same,
 * or a string or function if it's different
 */
exports.spacingAttributesCustom = {
    marginCustom: "margin",
    marginTopCustom: "marginTop",
    marginRightCustom: "marginRight",
    marginBottomCustom: "marginBottom",
    marginLeftCustom: "marginLeft",
    marginXCustom: (props, value) => {
        props["marginLeft"] = value;
        props["marginRight"] = value;
    },
    marginYCustom: (props, value) => {
        props["marginTop"] = value;
        props["marginBottom"] = value;
    },
    paddingCustom: "padding",
    paddingTopCustom: "paddingTop",
    paddingRightCustom: "paddingRight",
    paddingBottomCustom: "paddingBottom",
    paddingLeftCustom: "paddingLeft",
    paddingXCustom: (props, value) => {
        props["paddingLeft"] = value;
        props["paddingRight"] = value;
    },
    paddingYCustom: (props, value) => {
        props["paddingTop"] = value;
        props["paddingBottom"] = value;
    },
    borderCustom: "borderWidth",
    borderTopCustom: "borderTopWidth",
    borderRightCustom: "borderRightWidth",
    borderBottomCustom: "borderBottomWidth",
    borderLeftCusom: "borderLeftWidth",
    borderXCustom: (props, value) => {
        props["borderLeftWidth"] = value;
        props["borderRightWidth"] = value;
    },
    borderYCustom: (props, value) => {
        props["borderTopWidth"] = value;
        props["borderRightWidth"] = value;
    },
    borderRadiusCustom: "borderRadius",
    outlineOffsetCustom: "outlineOffset",
    topCustom: "top",
    rightCustom: "right",
    bottomCustom: "bottom",
    leftCustom: "left",
    columnWidthCustom: "columnWidth",
    lineHeightCustom: "lineHeight",
};
/**
 * All the spacing attributes that accept only theme spacing,
 * mapped to either true if the css camelcase name is the same,
 * or a string or function if it's different
 */
exports.spacingAttributesTheme = {
    margin: true,
    marginTop: true,
    marginRight: true,
    marginBottom: true,
    marginLeft: true,
    marginX: (props, value) => {
        props["marginLeft"] = value;
        props["marginRight"] = value;
    },
    marginY: (props, value) => {
        props["marginTop"] = value;
        props["marginBottom"] = value;
    },
    padding: true,
    paddingTop: true,
    paddingRight: true,
    paddingBottom: true,
    paddingLeft: true,
    paddingX: (props, value) => {
        props["paddingLeft"] = value;
        props["paddingRight"] = value;
    },
    paddingY: (props, value) => {
        props["paddingTop"] = value;
        props["paddingBottom"] = value;
    },
    border: "borderWidth",
    borderTop: "borderTopWidth",
    borderRight: "borderRightWidth",
    borderBottom: "borderBottomWidth",
    borderLeft: "borderLeftWidth",
    borderX: (props, value) => {
        props["borderLeftWidth"] = value;
        props["borderRightWidth"] = value;
    },
    borderY: (props, value) => {
        props["borderTopWidth"] = value;
        props["borderRightWidth"] = value;
    },
    borderRadius: true,
    outlineOffset: true,
    top: true,
    right: true,
    bottom: true,
    left: true,
    columnWidth: true,
    lineHeight: true,
};
/**
 * All the spacing attributes,
 * mapped to either true if the css camelcase name is the same,
 * or a string or function if it's different
 */
exports.spacingAttributes = Object.assign({}, exports.spacingAttributesCustom, exports.spacingAttributesTheme);
/**
 * Retrieves all spacing attributes their css equivalent, with the value obtained from the theme
 * @param props The props to retrieve the spacing from
 * @param theme The theme to get the spacing values from
 * @returns The css props
 */
function getSpacingAttributes(props, theme) {
    return getAttributes_1.getAttribute(props, exports.spacingAttributes, (value) => theme.getSpacing(value) || value);
}
exports.getSpacingAttributes = getSpacingAttributes;
//# sourceMappingURL=getSpacingAttributes.js.map