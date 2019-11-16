import {
    ContextProviderType,
    ContextProviderModule,
    ContextProvider,
    createModuleView,
    ViewWrapper,
    ContextProviderView,
} from "@adjust/core";
import {React} from "../../React";
import {createModule, createConfig} from "../../module/moduleClassCreator";
import {Themer, ThemerType, ThemerParent} from "./themer.type";

export const themeProviderConfig = createConfig({
    state: {
        themer: null as Themer,
    },
    getPriority: () => 1,
    settings: {},
    type: ContextProviderType,
});

/**
 * A module to put the themer's context into the component tree
 */
export class ThemeProviderModule
    extends createModule(themeProviderConfig, ContextProviderModule)
    implements ContextProvider, ThemerParent {
    /** @override */
    protected async onInit(): Promise<void> {
        await super.onInit();

        this.changeState({themer: await this.request({type: ThemerType})});
    }

    /** @override */
    public async onThemeUpdate(field: string): Promise<void> {
        // Nothing really hass to happen when the theme changes
    }
}
export default ThemeProviderModule;

export class ThemeProviderView extends createModuleView(
    ThemeProviderModule,
    {},
    ContextProviderView
) {
    /** @override */
    protected renderProvider(children: any): JSX.Element {
        if (this.state.themer)
            return <ViewWrapper view={this.state.themer}>{children}</ViewWrapper>;
        return children;
    }
}
