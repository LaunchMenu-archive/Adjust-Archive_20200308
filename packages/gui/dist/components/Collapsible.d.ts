import { FC, ReactNode } from "react";
/**
 * Renders a a collapsible item
 */
export declare const Collapsible: FC<{
    /** The header of the collapsible content */
    header: ReactNode | ((isOpened?: boolean) => ReactNode);
    /** The contents to be collapsible */
    contents: ReactNode;
}>;
