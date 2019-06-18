import {ParameterizedModule} from "../../../module/module";

/**
 * A condition to be applied to certain settings
 */
export type Condition = (target: ParameterizedModule) => boolean;
