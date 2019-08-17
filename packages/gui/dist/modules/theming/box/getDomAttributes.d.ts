import { AnyProps } from "./_types/anyProps";
import { ReactNode, CSSProperties, DOMAttributes } from "react";
/**
 * All the acceptable dom attributes, mapped to either true if the DOM camelcase attribute name is the same,
 * or a string if it's different
 */
export declare const domAttributes: {
    children: boolean;
    className: boolean;
    style: boolean;
    draggable: boolean;
};
/**
 * The attributes that can be assigned
 */
export declare type DomAttributes = {
    children?: ReactNode;
    className?: string;
    style?: CSSProperties;
    draggable?: boolean;
} & DOMAttributes<Element>;
/**
 * Retrieves all aplicable attributes
 * @param props The props to retrieve the data from
 * @returns The css props
 */
export declare function getDomAttributes(props: AnyProps): AnyProps;
