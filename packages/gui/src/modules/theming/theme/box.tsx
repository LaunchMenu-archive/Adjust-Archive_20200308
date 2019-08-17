import {React} from "../../../React";
import {getSpacingAttributes} from "../box/getSpacingAttributes";
import {getColorAttributes} from "../box/getColorAttributes";
import {getMappedAttributes} from "../box/getMappedAttributes";
import {ITheme} from "../_types/ITheme";
import {IBoxProps} from "../_types/IBoxComponent";
import {getDomAttributes} from "../box/getDomAttributes";

/**
 * A standard box element, which takes attributes/properties and translates them to css
 * @param props
 */
export const Box = (props: IBoxProps & {theme: ITheme}) => {
    // Extract some standard attributes
    const style = props.style;

    // Extract the spacings, colors and general attributes
    const spacings = getSpacingAttributes(props, props.theme);
    const colors = getColorAttributes(props, props.theme);
    const general = getMappedAttributes(props);
    let css = {...spacings, ...colors, ...general};

    // Get font style
    if (props.fontCustom) Object.assign(css, props.fontCustom);
    if (props.font) {
        const font = props.theme.getFontStyle(props.font as any);
        if (font instanceof Object) Object.assign(css, font);
    }

    // Extract the shadow
    if (props.shadow || props.shadowCustom)
        css["boxShadow"] =
            props.theme.getShadow((props.shadow || props.shadowCustom) as any) ||
            props.shadowCustom;
    if (Object.keys(css).length == 0) css = undefined;

    // Extract dom attributes to apply
    const domAttributes = getDomAttributes(props);

    // Extract the component
    const Comp = props.as || ("div" as any);

    // Create the element with the retrieve data
    return <Comp {...domAttributes} css={{...css, ...style}} />;
};
