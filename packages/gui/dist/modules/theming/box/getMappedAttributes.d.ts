import { AnyProps } from "./_types/anyProps";
import { CssDisplay, CssPosition, CssFlexDirection, CssJustifyContent, CssAlignItems, CssAlignContent, CssAlignSelf, CssVerticalAlign, CssOverflow, CssBorderStyle } from "./_types/cssTypes";
/**
 * All the standard attributes, mapped to either true if the css camelcase name is the same,
 * or a string if it's different
 */
export declare const mappedAttributes: {
    width: boolean;
    height: boolean;
    display: boolean;
    position: boolean;
    overflow: boolean;
    overflowX: boolean;
    overflowY: boolean;
    borderStyle: boolean;
    borderTopStyle: boolean;
    borderRightStyle: boolean;
    borderBottomStyle: boolean;
    borderLeftStyle: boolean;
    verticalAlign: boolean;
    flexDirection: boolean;
    flexWrap: boolean;
    justifyContent: boolean;
    alignItems: boolean;
    alignContent: boolean;
    alignSelf: boolean;
    zIndex: boolean;
    order: boolean;
    flexGrow: boolean;
    flexShrink: boolean;
    flexBasis: boolean;
    flex: boolean;
    cursor: boolean;
};
/**
 * The attributes that can be assigned
 */
export declare type MappedAttributes = {
    display?: CssDisplay;
    position?: CssPosition;
    overflow?: CssOverflow;
    overflowX?: CssOverflow;
    overflowY?: CssOverflow;
    borderStyle?: CssBorderStyle;
    borderTopStyle?: CssBorderStyle;
    borderRightStyle?: CssBorderStyle;
    borderBottomStyle?: CssBorderStyle;
    borderLeftStyle?: CssBorderStyle;
    verticalAlign?: CssVerticalAlign;
    flexDirection?: CssFlexDirection;
    flexWrap?: CssFlexDirection;
    justifyContent?: CssJustifyContent;
    alignItems?: CssAlignItems;
    alignContent?: CssAlignContent;
    alignSelf?: CssAlignSelf;
    zIndex?: number;
    order?: number;
    flexGrow?: number;
    flexShrink?: number;
    flexBasis?: string;
    flex?: string;
    width?: string | number;
    height?: string | number;
};
/**
 * Retrieves all attributes their css equivalent
 * @param props The props to retrieve the data from
 * @returns The css props
 */
export declare function getMappedAttributes(props: AnyProps): AnyProps;
