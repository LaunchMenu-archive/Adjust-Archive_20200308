import {React} from "../React";
import {IBoxProps} from "../modules/theming/_types/IBoxComponent";
import {Box} from "./Box";

export const parentCss = {
    position: "relative" as "relative",
};

/**
 * A box element to use when you want to allow your child module to stretch and fill this area
 * @param props All normal Box properties
 */
export const ParentBox = (props: IBoxProps) => <Box css={parentCss} {...props}></Box>;
