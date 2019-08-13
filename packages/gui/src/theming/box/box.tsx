import {React} from "@adjust/core";
import {SpacingAttributes, getSpacingAttributes} from "./getSpacingAttributes";
import {ColorAttributes, getColorAttributes} from "./getColorAttributes";
import {CSSProperties} from "react";
import {themeContext} from "../themeConstext";
import {MappedAttributes, getMappedAttributes} from "./getMappedAttributes";

const inline = true;

/**
 * A standard box element, which takes attributes/properties and translates them to css
 * @param props
 */
export const Box = (
    props: {
        children?: any;
        shadow?: string;
        fontSize?: string | number;
        className?: string;
        style?: CSSProperties;
        onClick?: () => void;
        // TODO: add other event listeners
    } & SpacingAttributes &
        ColorAttributes &
        MappedAttributes
) => (
    <themeContext.Consumer>
        {theme => {
            // Extract some standard attributes
            const className = props.className;
            const children = props.children;
            const style = props.style;

            // Extract the spacings and colors
            const spacings = getSpacingAttributes(props, theme);
            const colors = getColorAttributes(props, theme);
            const general = getMappedAttributes(props);
            let css = {...spacings, ...colors, ...general};

            // Extract the shadow
            if (props.shadow) css["boxShadow"] = theme.getShadow(props.shadow);
            if (Object.keys(css).length == 0) css = undefined;

            // Create the element with the retrieve data
            if (inline)
                return (
                    <div
                        className={className}
                        style={{...css, ...style}}
                        onClick={props.onClick}>
                        {children}
                    </div>
                );
            else
                return (
                    <div
                        className={className}
                        style={style}
                        css={css}
                        onClick={props.onClick}>
                        {children}
                    </div>
                );
        }}
    </themeContext.Consumer>
);
