import {React as OrReact} from "@adjust/core";
import {jsx} from "@emotion/core";

// Replace react's createElement with Emotion's version
export const React = {...OrReact, createElement: jsx};
