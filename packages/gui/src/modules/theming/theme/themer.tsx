import {
    Registry,
    InstanceModuleProvider,
    createModuleView as createCoreModuleView,
} from "@adjust/core";
import {CSSProperties} from "react";
import {React} from "../../../React";
import {Themer, ThemerType, ThemeContext} from "../themer.type";
import {themeSettings, IThemeData} from "../themeSettings";
import {ITheme} from "../_types/ITheme";
import {Theme} from "./theme";
import {ThemeProvider} from "emotion-theming";
import {Customizer, registerIcons} from "office-ui-fabric-react";
import {Box} from "./box";
import {createModule, createConfig} from "../../../module/moduleClassCreator";

export const themerConfig = createConfig({
    state: {},
    getPriority: () => 1,
    settings: themeSettings,
    type: ThemerType,
});

/**
 * A module of this type is used as the root of the module
 */
export class ThemerModule extends createModule(themerConfig) implements Themer {
    protected theme: ITheme;

    /** @override */
    protected async onPreInit(): Promise<void> {
        Registry.addProvider(new InstanceModuleProvider(ThemerType, this, () => 2));
    }

    /** @override */
    protected async onInit(fromReload: boolean): Promise<void> {
        this.getSettingsObject().on("change", field => this.updateTheme(field));
    }

    /**
     * Updates the theme object and notifies all the parents
     * @param field The field that has been altered
     */
    protected updateTheme(field: string): void {
        this.theme = new Theme(this.settings);
        this.getParents().forEach(parent => parent.onThemeUpdate(field));
    }

    /** @override */
    public async getColor(
        colorName: keyof IThemeData["palette"] | keyof IThemeData["customPalette"]
    ): Promise<string> {
        return this.theme.getColor(colorName);
    }

    /** @override */
    public async getSpacing(
        spacingName: keyof IThemeData["spacing"]
    ): Promise<string | number> {
        return this.theme.getSpacing(spacingName);
    }

    /** @override */
    public async getFontStyle(
        styleName: keyof IThemeData["fontStyles"]
    ): Promise<CSSProperties> {
        return this.theme.getFontStyle(styleName);
    }

    /** @override */
    public async getShadow(shadowName: keyof IThemeData["shadows"]): Promise<string> {
        return this.theme.getShadow(shadowName);
    }
}
export default ThemerModule;

export class ThemerView extends createCoreModuleView(ThemerModule) {
    /** @override  */
    public renderView(): JSX.Element {
        const theme = new Theme(this.settings);
        const fabricTheme = theme.getFabricUItheme();
        const icons = theme.getFabricUIicons();
        registerIcons(icons);
        return (
            <ThemeContext.Provider value={{theme, Box}}>
                <ThemeProvider theme={() => theme}>
                    <Customizer settings={{theme: fabricTheme}}>
                        {this.props.children}
                    </Customizer>
                </ThemeProvider>
            </ThemeContext.Provider>
        );
    }
}
