var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const react_1 = require("react");
const emotion_theming_1 = require("emotion-theming");
const office_ui_fabric_react_1 = require("office-ui-fabric-react");
const deep_equal_1 = __importDefault(require("deep-equal"));
const themer_type_1 = require("./themer.type");
const React_1 = require("../../React");
/**
 * A replacement for memo that uses deep comparison
 * @param computeValue The value to memoize
 * @param dependencies The dependencies of the value
 * @returns The memoized value
 */
function useDeepMemo(computeValue, dependencies) {
    const ref = react_1.useRef({});
    if (!deep_equal_1.default(ref.current.dependencies, dependencies))
        ref.current = { value: computeValue(), dependencies };
    return ref.current.value;
}
/**
 * A component to extend the theme from the context, and provide it in the new context
 * @param props The properties of the component
 * @returns A JSX element
 */
exports.ThemeExtender = ({ children, themeChanges, resetTheme, }) => {
    const themeData = react_1.useContext(themer_type_1.ThemeContext);
    // Make sure to not recompute the theme on every render
    const extendedThemeData = useDeepMemo(() => {
        const extendedTheme = resetTheme
            ? themeData.theme.getSuperTheme(0).extendTheme(themeChanges)
            : themeData.theme.extendTheme(themeChanges);
        return {
            themeContext: { Box: themeData.Box, theme: extendedTheme },
            fabricTheme: extendedTheme.getFabricUItheme(),
        };
    }, [themeChanges, themeData.Box, resetTheme]);
    // Provide the theme to all channels
    return (React_1.React.createElement(themer_type_1.ThemeContext.Provider, { value: extendedThemeData.themeContext },
        React_1.React.createElement(emotion_theming_1.ThemeProvider, { theme: () => extendedThemeData.themeContext.theme },
            React_1.React.createElement(office_ui_fabric_react_1.Customizer, { settings: { theme: extendedThemeData.fabricTheme } }, children(extendedThemeData.themeContext.theme)))));
};
//# sourceMappingURL=themeExtender.js.map