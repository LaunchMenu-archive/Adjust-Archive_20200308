/// <reference types="react" />
import { IBoxProps } from "../modules/theming/_types/IBoxComponent";
export declare const parentCss: {
    position: "relative";
};
/**
 * A box element to use when you want to allow your child module to stretch and fill this area
 * @param props All normal Box properties
 */
export declare const ParentBox: (props: IBoxProps) => JSX.Element;
