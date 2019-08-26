import {Json} from "../../../utils/_types/standardTypes";

/**
 * A type fpr evaluators of attributes
 */
export type ISettingAttributeEvaluator<T> =
    | {
          /**
           * The paths that this value is dependant on
           */
          dependencies: string[];
          /**
           * Whether or not this attribute id dependant on the search value
           */
          searchDependency?: boolean;
          /**
           * The evaluator function itself
           */
          evaluator: (settings: Json, searchValue: string, settingPath: string) => T;
      }
    /**
     * A shorthand evaluator, where the dependency will be the setting
     */
    | ((settings: Json) => T)
    /**
     * Just a plain literal value
     */
    | T;
