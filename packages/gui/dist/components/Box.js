Object.defineProperty(exports, "__esModule", { value: true });
const React_1 = require("../React");
const themer_type_1 = require("../modules/theming/themer.type");
const react_1 = require("react");
/**
 * A standard box component that uses the theme to style an element
 * @param props The theming properties to apply
 * @returns A jsx element
 */
exports.Box = (props) => {
    const theme = react_1.useContext(themer_type_1.ThemeContext);
    return React_1.React.createElement(theme.Box, Object.assign({ theme: theme.theme }, props));
};
//# sourceMappingURL=Box.js.map