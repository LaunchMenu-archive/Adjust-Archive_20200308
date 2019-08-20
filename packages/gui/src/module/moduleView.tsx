import {ModuleView as CoreModuleView} from "@adjust/core";
import {ModuleState, SettingsConfigSet} from "@adjust/core/types";
import {Module} from "./module";
import {React} from "../React";
import {ITheme} from "../modules/theming/_types/ITheme";
import {ThemeExtender} from "../modules/theming/themeExtender";
import {ClassNames} from "@emotion/core";

/**
 * A class that can visually represent the module
 */
export abstract class ModuleView<
    S extends ModuleState,
    C extends SettingsConfigSet,
    M extends Module,
    D extends any
> extends CoreModuleView<S, C, M, D> {
    // The theme with the mmodule's customizations applied
    protected theme: ITheme;

    /**
     * Renders the element the regular way, but adds a classname to apply the setting's css
     * @returns The jsx element
     */
    protected renderWithSettingsCss(): JSX.Element {
        const styleOverride = this.settings.styleOverride as any;
        const el = super.render();
        // TODO: allow for theme props
        return (
            <ClassNames>
                {({css, cx}) =>
                    React.cloneElement(el, {
                        className:
                            (el.props.className ? el.props.className : "") +
                            " " +
                            css(styleOverride.css),
                    })
                }
            </ClassNames>
        );
    }

    /**
     * @override The normal react render method
     */
    public render(): JSX.Element {
        // Render one of the not ready screens if the data isn't ready
        const notReady = this.notReadyRender();
        if (notReady) return notReady;

        // Otherwise call the usual render after setting the theme
        const styleOverride = this.settings.styleOverride as any;
        return (
            <ThemeExtender
                themeChanges={styleOverride.theme}
                resetTheme={styleOverride.resetTheme}>
                {theme => {
                    this.theme = theme;
                    if (styleOverride.css) return this.renderWithSettingsCss();
                    return super.render();
                }}
            </ThemeExtender>
        );
    }
}
