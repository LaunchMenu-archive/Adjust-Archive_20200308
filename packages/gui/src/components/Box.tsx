import {React} from "../React";
import {IBoxProps} from "../modules/theming/_types/IBoxComponent";
import {ThemeContext} from "../modules/theming/themer.type";
import {useContext} from "react";

/**
 * A standard box component that uses the theme to style an element
 * @param props The theming properties to apply
 * @returns A jsx element
 */
export const Box = (props: IBoxProps) => {
    const theme = useContext(ThemeContext);
    return <theme.Box theme={theme.theme} {...props} />;
};
