import {Theme} from "../theme";
import {AnyProps} from "./_types/anyProps";
import {getAttribute} from "./getAttributes";
import {ThemeSpacing} from "../_types/themeData";

/**
 * All the spacing attributes, mapped to either true if the css camelcase name is the same,
 * or a string or function if it's different
 */
export const spacingAttributes = {
    m: "margin",
    mt: "marginTop",
    mr: "marginRight",
    mb: "marginBottom",
    ml: "marginLeft",
    mx: (props: AnyProps, value: any) => {
        props["marginLeft"] = value;
        props["marginRight"] = value;
    },
    my: (props: AnyProps, value: any) => {
        props["marginTop"] = value;
        props["marginBottom"] = value;
    },
    p: "padding",
    pt: "paddingTop",
    pr: "paddingRight",
    pb: "paddingBottom",
    pl: "paddingLeft",
    px: (props: AnyProps, value: any) => {
        props["paddingLeft"] = value;
        props["paddingRight"] = value;
    },
    py: (props: AnyProps, value: any) => {
        props["paddingTop"] = value;
        props["paddingBottom"] = value;
    },
    border: "borderWidth",
    borderTop: "borderTopWidth",
    borderRight: "borderRightWidth",
    borderBottom: "borderBottomWidth",
    borderLeft: "borderLeftWidth",
    borderx: (props: AnyProps, value: any) => {
        props["borderLeftWidth"] = value;
        props["borderRightWidth"] = value;
    },
    bordery: (props: AnyProps, value: any) => {
        props["borderTopWidth"] = value;
        props["borderRightWidth"] = value;
    },
    borderRadius: true,
    outlineOffset: true,
    top: true,
    right: true,
    bottom: true,
    left: true,
    columnWidth: true,
    lineHeight: true,
};

/**
 * The spacing attributes that can be assigned
 */
export type SpacingAttributes = {
    [P in keyof typeof spacingAttributes]?: keyof ThemeSpacing | string | number
};

/**
 * Retrieves all spacing attributes their css equivalent, with the value obtained from the theme
 * @param props The props to retrieve the spacing from
 * @param theme The theme to get the spacing values from
 * @returns The css props
 */
export function getSpacingAttributes(props: AnyProps, theme: Theme): AnyProps {
    return getAttribute(props, spacingAttributes, (value: any) =>
        theme.getSpacing(value)
    );
}
