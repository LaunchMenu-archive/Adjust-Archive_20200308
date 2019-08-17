Object.defineProperty(exports, "__esModule", { value: true });
const React_1 = require("../../../React");
const getSpacingAttributes_1 = require("../box/getSpacingAttributes");
const getColorAttributes_1 = require("../box/getColorAttributes");
const getMappedAttributes_1 = require("../box/getMappedAttributes");
const getDomAttributes_1 = require("../box/getDomAttributes");
/**
 * A standard box element, which takes attributes/properties and translates them to css
 * @param props
 */
exports.Box = (props) => {
    // Extract some standard attributes
    const style = props.style;
    // Extract the spacings, colors and general attributes
    const spacings = getSpacingAttributes_1.getSpacingAttributes(props, props.theme);
    const colors = getColorAttributes_1.getColorAttributes(props, props.theme);
    const general = getMappedAttributes_1.getMappedAttributes(props);
    let css = Object.assign({}, spacings, colors, general);
    // Get font style
    if (props.fontCustom)
        Object.assign(css, props.fontCustom);
    if (props.font) {
        const font = props.theme.getFontStyle(props.font);
        if (font instanceof Object)
            Object.assign(css, font);
    }
    // Extract the shadow
    if (props.shadow || props.shadowCustom)
        css["boxShadow"] =
            props.theme.getShadow((props.shadow || props.shadowCustom)) ||
                props.shadowCustom;
    if (Object.keys(css).length == 0)
        css = undefined;
    // Extract dom attributes to apply
    const domAttributes = getDomAttributes_1.getDomAttributes(props);
    // Extract the component
    const Comp = props.as || "div";
    // Create the element with the retrieve data
    return React_1.React.createElement(Comp, Object.assign({}, domAttributes, { css: Object.assign({}, css, style) }));
};
//# sourceMappingURL=box.js.map