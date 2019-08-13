import { SpacingAttributes } from "./getSpacingAttributes";
import { ColorAttributes } from "./getColorAttributes";
import { CSSProperties } from "react";
import { MappedAttributes } from "./getMappedAttributes";
/**
 * A standard box element, which takes attributes/properties and translates them to css
 * @param props
 */
export declare const Box: (props: {
    children?: any;
    shadow?: string;
    fontSize?: string | number;
    className?: string;
    style?: CSSProperties;
    onClick?: () => void;
} & SpacingAttributes & ColorAttributes & MappedAttributes) => JSX.Element;
