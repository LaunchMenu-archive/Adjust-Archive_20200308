Object.defineProperty(exports, "__esModule", { value: true });
const themer_type_1 = require("./themer.type");
const React_1 = require("../../React");
/**
 * A component to extend the theme from the context, and provide it in the new context
 * @param props The properties of the component
 * @returns A JSX element
 */
exports.ThemeExtender = ({ children, themeChanges, }) => (React_1.React.createElement(themer_type_1.ThemeContext.Consumer, null, themeData => {
    const theme = themeData.theme;
    const extendedTheme = theme.extendTheme(themeChanges);
    return (React_1.React.createElement(themer_type_1.ThemeContext.Provider, { value: { Box: themeData.Box, theme: extendedTheme } }, children(extendedTheme)));
}));
//# sourceMappingURL=themExtender.js.map