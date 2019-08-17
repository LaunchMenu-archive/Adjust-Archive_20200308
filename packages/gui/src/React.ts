import {React as OrReact} from "@adjust/core";
import {jsx, InterpolationWithTheme} from "@emotion/core";
import {ITheme} from "./modules/theming/_types/ITheme";

// Replace react's createElement with Emotion's version
export const React = {...OrReact, createElement: jsx};

// Declare the correct JSX typings
declare module "react" {
    interface DOMAttributes<T> {
        css?: InterpolationWithTheme<ITheme>;
    }
}
declare global {
    namespace JSX {
        interface IntrinsicAttributes {
            css?: InterpolationWithTheme<ITheme>;
        }
    }
}
