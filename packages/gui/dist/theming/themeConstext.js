Object.defineProperty(exports, "__esModule", { value: true });
const react_1 = require("react");
const theme_1 = require("./theme");
const defaultTheme_1 = require("./defaultTheme");
exports.themeContext = react_1.createContext(new theme_1.Theme(defaultTheme_1.defaultTheme));
exports.ThemeConsumer = exports.themeContext.Consumer;
exports.ThemeProvider = exports.themeContext.Provider;
//# sourceMappingURL=themeConstext.js.map