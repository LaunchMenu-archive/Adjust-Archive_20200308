/// <reference path="../../React.d.ts" />
/// <reference types="react" />
import { ContextProviderModule, ContextProvider, ContextProviderView } from "@adjust/core";
import { ThemerParent } from "./themer.type";
export declare const themeProviderConfig: {
    state: {
        themer: import("@adjust/core/types").ChildModule<{
            getColor(colorName: "themePrimary" | "themeLighterAlt" | "themeLighter" | "themeLight" | "themeTertiary" | "themeSecondary" | "themeDarkAlt" | "themeDark" | "themeDarker" | "neutralLighterAlt" | "neutralLighter" | "neutralLight" | "neutralQuaternaryAlt" | "neutralQuaternary" | "neutralTertiaryAlt" | "neutralTertiary" | "neutralSecondary" | "neutralPrimaryAlt" | "neutralPrimary" | "neutralDark" | "black" | "white" | "accent" | "blackTranslucent40" | "whiteTranslucent40" | "yellowDark" | "yellow" | "yellowLight" | "orange" | "orangeLight" | "orangeLighter" | "redDark" | "red" | "magentaDark" | "magenta" | "magentaLight" | "purpleDark" | "purple" | "purpleLight" | "blueDark" | "blueMid" | "blue" | "blueLight" | "tealDark" | "teal" | "tealLight" | "greenDark" | "green" | "greenLight" | "primary" | "primaryDark" | "primaryLight"): Promise<string>;
            getSpacing(spacingName: "xxs" | "xs" | "s" | "m" | "l" | "xl" | "xxl"): Promise<import("react").ReactText>;
            getFontStyle(styleName: "tiny" | "xSmall" | "small" | "smallPlus" | "medium" | "mediumPlus" | "large" | "xLarge" | "xLargePlus" | "xxLarge" | "xxLargePlus" | "superLarge" | "mega"): Promise<import("react").CSSProperties>;
            getShadow(shadowName: "tiny" | "small" | "medium" | "large"): Promise<string>;
        }>;
    };
    getPriority: () => number;
    settings: {};
    type: import("@adjust/core/types").ContractID<import("@adjust/core").ContextProviderContract>;
};
declare const ThemeProviderModule_base: import("@adjust/core/types").ExtendedModuleClass<{
    state: {
        themer: import("@adjust/core/types").ChildModule<{
            getColor(colorName: "themePrimary" | "themeLighterAlt" | "themeLighter" | "themeLight" | "themeTertiary" | "themeSecondary" | "themeDarkAlt" | "themeDark" | "themeDarker" | "neutralLighterAlt" | "neutralLighter" | "neutralLight" | "neutralQuaternaryAlt" | "neutralQuaternary" | "neutralTertiaryAlt" | "neutralTertiary" | "neutralSecondary" | "neutralPrimaryAlt" | "neutralPrimary" | "neutralDark" | "black" | "white" | "accent" | "blackTranslucent40" | "whiteTranslucent40" | "yellowDark" | "yellow" | "yellowLight" | "orange" | "orangeLight" | "orangeLighter" | "redDark" | "red" | "magentaDark" | "magenta" | "magentaLight" | "purpleDark" | "purple" | "purpleLight" | "blueDark" | "blueMid" | "blue" | "blueLight" | "tealDark" | "teal" | "tealLight" | "greenDark" | "green" | "greenLight" | "primary" | "primaryDark" | "primaryLight"): Promise<string>;
            getSpacing(spacingName: "xxs" | "xs" | "s" | "m" | "l" | "xl" | "xxl"): Promise<import("react").ReactText>;
            getFontStyle(styleName: "tiny" | "xSmall" | "small" | "smallPlus" | "medium" | "mediumPlus" | "large" | "xLarge" | "xLargePlus" | "xxLarge" | "xxLargePlus" | "superLarge" | "mega"): Promise<import("react").CSSProperties>;
            getShadow(shadowName: "tiny" | "small" | "medium" | "large"): Promise<string>;
        }>;
    };
    getPriority: () => number;
    settings: {};
    type: import("@adjust/core/types").ContractID<import("@adjust/core").ContextProviderContract>;
}, typeof ContextProviderModule>;
/**
 * A module to put the themer's context into the component tree
 */
export declare class ThemeProviderModule extends ThemeProviderModule_base implements ContextProvider, ThemerParent {
    /** @override */
    protected onInit(fromReload: boolean): Promise<void>;
    /** @override */
    onThemeUpdate(field: string): Promise<void>;
}
export default ThemeProviderModule;
declare const ThemeProviderView_base: import("@adjust/core/types").ExtendedModuleViewClass<typeof ThemeProviderModule, {}, typeof ContextProviderView>;
export declare class ThemeProviderView extends ThemeProviderView_base {
    /** @override */
    protected renderProvider(children: any): JSX.Element;
}
