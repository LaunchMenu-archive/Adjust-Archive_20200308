Object.defineProperty(exports, "__esModule", { value: true });
const core_1 = require("@adjust/core");
const getSpacingAttributes_1 = require("./getSpacingAttributes");
const getColorAttributes_1 = require("./getColorAttributes");
const themeConstext_1 = require("../themeConstext");
const getMappedAttributes_1 = require("./getMappedAttributes");
const inline = true;
/**
 * A standard box element, which takes attributes/properties and translates them to css
 * @param props
 */
exports.Box = (props) => (core_1.React.createElement(themeConstext_1.themeContext.Consumer, null, theme => {
    // Extract some standard attributes
    const className = props.className;
    const children = props.children;
    const style = props.style;
    // Extract the spacings and colors
    const spacings = getSpacingAttributes_1.getSpacingAttributes(props, theme);
    const colors = getColorAttributes_1.getColorAttributes(props, theme);
    const general = getMappedAttributes_1.getMappedAttributes(props);
    let css = Object.assign({}, spacings, colors, general);
    // Extract the shadow
    if (props.shadow)
        css["boxShadow"] = theme.getShadow(props.shadow);
    if (Object.keys(css).length == 0)
        css = undefined;
    // Create the element with the retrieve data
    if (inline)
        return (core_1.React.createElement("div", { className: className, style: Object.assign({}, css, style), onClick: props.onClick }, children));
    else
        return (core_1.React.createElement("div", { className: className, style: style, css: css, onClick: props.onClick }, children));
}));
//# sourceMappingURL=box.js.map