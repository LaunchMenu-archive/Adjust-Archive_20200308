import { ParameterizedModule } from "../../../module/module";
/**
 * A condition to be applied to certain settings
 */
export declare type Condition = (target: ParameterizedModule) => boolean;
