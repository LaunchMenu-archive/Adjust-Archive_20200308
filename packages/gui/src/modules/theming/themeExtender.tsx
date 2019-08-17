import {useContext, useRef} from "react";
import {ThemeProvider} from "emotion-theming";
import {Customizer} from "office-ui-fabric-react/lib-commonjs";
import deepEqual from "deep-equal";
import {DeepPartial} from "@adjust/core/types";
import {ThemeContext} from "./themer.type";
import {React} from "../../React";
import {ITheme} from "./_types/ITheme";
import {IThemeData} from "./themeSettings";

/**
 * A replacement for memo that uses deep comparison
 * @param computeValue The value to memoize
 * @param dependencies The dependencies of the value
 * @returns The memoized value
 */
function useDeepMemo<T extends any>(computeValue: () => T, dependencies: any[]): T {
    const ref = useRef({} as {value: any; dependencies: any[]});

    if (!deepEqual(ref.current.dependencies, dependencies))
        ref.current = {value: computeValue(), dependencies};

    return ref.current.value;
}

/**
 * A component to extend the theme from the context, and provide it in the new context
 * @param props The properties of the component
 * @returns A JSX element
 */
export const ThemeExtender = ({
    children,
    themeChanges,
    resetTheme,
}: {
    /** The children function that receives the theme */
    children: (ITheme) => JSX.Element;
    /** The changes to apply to the theme */
    themeChanges: DeepPartial<IThemeData>;
    /** Whether or not the theme should be extended from the base theme, rather than an inherited theme */
    resetTheme: boolean;
}) => {
    const themeData = useContext(ThemeContext);
    // Make sure to not recompute the theme on every render
    const extendedThemeData = useDeepMemo(() => {
        const extendedTheme = resetTheme
            ? themeData.theme.getSuperTheme(0).extendTheme(themeChanges)
            : themeData.theme.extendTheme(themeChanges);
        return {
            themeContext: {Box: themeData.Box, theme: extendedTheme},
            fabricTheme: extendedTheme.getFabricUItheme(),
        };
    }, [themeChanges, themeData.Box, resetTheme]);

    // Provide the theme to all channels
    return (
        <ThemeContext.Provider value={extendedThemeData.themeContext}>
            <ThemeProvider theme={() => extendedThemeData.themeContext.theme}>
                <Customizer settings={{theme: extendedThemeData.fabricTheme}}>
                    {children(extendedThemeData.themeContext.theme)}
                </Customizer>
            </ThemeProvider>
        </ThemeContext.Provider>
    );
};
