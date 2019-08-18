/// <reference types="react" />
import { IBoxProps } from "../modules/theming/_types/IBoxComponent";
export declare const childCss: {
    position: "absolute";
    left: number;
    right: number;
    top: number;
    bottom: number;
};
/**
 * A box element to use when you want to stretch your component the size that the parent module allows
 * @param props All normal Box properties
 */
export declare const ChildBox: (props: IBoxProps) => JSX.Element;
