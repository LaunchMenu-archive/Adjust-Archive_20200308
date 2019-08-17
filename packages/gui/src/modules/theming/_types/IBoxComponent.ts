import {CSSProperties, DOMAttributes} from "react";
import {SpacingAttributes} from "../box/getSpacingAttributes";
import {ColorAttributes} from "../box/getColorAttributes";
import {MappedAttributes} from "../box/getMappedAttributes";
import {IThemeData} from "../themeSettings";
import {ITheme} from "./ITheme";
import {DomAttributes} from "../box/getDomAttributes";

/**
 * The properties that can be applied to style a box
 */
export type IBoxProps = {
    children?: any;
    as?: React.ComponentClass | React.FunctionComponent | string;
    shadow?: keyof IThemeData["shadows"];
    shadowCustom?: string;
    font?: keyof IThemeData["fontStyles"] | CSSProperties;
    fontCustom?: CSSProperties;
    className?: string;
    style?: CSSProperties;
} & SpacingAttributes &
    ColorAttributes &
    MappedAttributes &
    DomAttributes;

/**
 * Creates a box component applying the attributes and the theme
 * @param props The properties to style the box with
 * @returns A jsx element
 */
export type IBoxComponent = (props: IBoxProps & {theme: ITheme}) => JSX.Element;
