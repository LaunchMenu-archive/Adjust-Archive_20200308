import {React} from "../React";
import {IBoxProps} from "../modules/theming/_types/IBoxComponent";
import {Box} from "./Box";

export const childCss = {
    position: "absolute" as "absolute",
    left: 0,
    right: 0,
    top: 0,
    bottom: 0,
};

/**
 * A box element to use when you want to stretch your component the size that the parent module allows
 * @param props All normal Box properties
 */
export const ChildBox = (props: IBoxProps) => <Box css={childCss} {...props}></Box>;
