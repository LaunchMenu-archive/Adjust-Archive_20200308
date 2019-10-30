export declare type ISettingAttributeEvaluatorDependency = string | ((
/** The listener to be registered, should return an unregister method */
listener: (newValue: any) => void) => () => void);
/**
 * A type fpr evaluators of attributes
 */
export declare type ISettingAttributeEvaluator<T> = {
    /**
     * The paths of settings that this value is dependent on
     */
    dependencies: {
        [key: string]: ISettingAttributeEvaluatorDependency;
    };
    /**
     * Whether or not this attribute is dependent on the search value
     */
    searchDependent?: boolean;
    /**
     * The evaluator function itself
     */
    evaluator: (settings: {
        [key: string]: any;
    }, searchValue: string) => T;
}
/**
 * A shorthand evaluator, where the dependency will be the setting
 */
 | ((settings: {
    [key: string]: any;
}) => T)
/**
 * Just a plain literal value
 */
 | T;
