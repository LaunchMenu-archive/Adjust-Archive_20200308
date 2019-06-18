import { ConditionalSettingsData } from "./conditionalSettingsData";
import { SortedList } from "../../../utils/sortedList";
/**
 * A list of Settings that apply only when the given condition is met,
 * where the data is stored in an actual Data object,
 * sorted on the priority of the conditions
 */
export declare type ConditionalSettingsDataList<D extends object> = SortedList<ConditionalSettingsData<D>>;
/**
 * ConditionalSettingsDataList, with a default parameter provided
 */
export declare type ParameterizedConditionalSettingsDataList = ConditionalSettingsDataList<{}>;
