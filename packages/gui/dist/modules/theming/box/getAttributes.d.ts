import { AnyProps } from "./_types/anyProps";
/**
 * Retrieves attributes their css equivalent, with the value obtained from the theme
 * @param props The props to retrieve the data from
 * @param attributes The attribute data that maps to the css
 * @param theme The theme to get the data from
 * @returns The css props
 */
export declare function getAttribute(props: AnyProps, attributes: {
    [attribute: string]: string | boolean | ((props: AnyProps, value: any) => void);
} | ((attribute: string) => string | boolean | ((props: AnyProps, value: any) => void)), getValue: (value: any, key: string, outProps: AnyProps) => any): AnyProps;
