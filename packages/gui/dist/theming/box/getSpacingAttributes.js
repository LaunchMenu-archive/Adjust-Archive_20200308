Object.defineProperty(exports, "__esModule", { value: true });
const getAttributes_1 = require("./getAttributes");
/**
 * All the spacing attributes, mapped to either true if the css camelcase name is the same,
 * or a string or function if it's different
 */
exports.spacingAttributes = {
    m: "margin",
    mt: "marginTop",
    mr: "marginRight",
    mb: "marginBottom",
    ml: "marginLeft",
    mx: (props, value) => {
        props["marginLeft"] = value;
        props["marginRight"] = value;
    },
    my: (props, value) => {
        props["marginTop"] = value;
        props["marginBottom"] = value;
    },
    p: "padding",
    pt: "paddingTop",
    pr: "paddingRight",
    pb: "paddingBottom",
    pl: "paddingLeft",
    px: (props, value) => {
        props["paddingLeft"] = value;
        props["paddingRight"] = value;
    },
    py: (props, value) => {
        props["paddingTop"] = value;
        props["paddingBottom"] = value;
    },
    border: "borderWidth",
    borderTop: "borderTopWidth",
    borderRight: "borderRightWidth",
    borderBottom: "borderBottomWidth",
    borderLeft: "borderLeftWidth",
    borderx: (props, value) => {
        props["borderLeftWidth"] = value;
        props["borderRightWidth"] = value;
    },
    bordery: (props, value) => {
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
 * Retrieves all spacing attributes their css equivalent, with the value obtained from the theme
 * @param props The props to retrieve the spacing from
 * @param theme The theme to get the spacing values from
 * @returns The css props
 */
function getSpacingAttributes(props, theme) {
    return getAttributes_1.getAttribute(props, exports.spacingAttributes, (value) => theme.getSpacing(value));
}
exports.getSpacingAttributes = getSpacingAttributes;
//# sourceMappingURL=getSpacingAttributes.js.map