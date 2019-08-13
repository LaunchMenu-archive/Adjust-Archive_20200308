import {createContext} from "react";
import {Theme} from "./theme";
import {defaultTheme} from "./defaultTheme";

export const themeContext = createContext(new Theme(defaultTheme));
export const ThemeConsumer = themeContext.Consumer;
export const ThemeProvider = themeContext.Provider;
