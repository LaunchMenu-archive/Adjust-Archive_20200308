Object.defineProperty(exports, "__esModule", { value: true });
/**
 * A rough method to obtain the text of a react node, won't get the exact text
 * @param node The react node to get the text of
 * @returns The text of the node
 */
function textOfNode(node) {
    if (!node)
        return "";
    if (typeof node == "string")
        return node;
    if (node instanceof Array)
        return node.reduce((prev, next) => prev + " " + textOfNode(next), "");
    if (node instanceof Object && "props" in node) {
        const props = node.props;
        if ("children" in props) {
            return textOfNode(props.children);
        }
    }
    return "";
}
/**
 * Returns whether this setting should show up given the current search term
 * @param dependencies The values of the properties the decision is dependent on
 * @param searchValue The current search term
 * @returns Whether to exclude (if true) the given setting
 */
function filterSettingFromSearch({ 
/** The tags of the setting */
tags, 
/** The name of the setting */
name, 
/** The description of the setting */
description, }, searchValue) {
    if (searchValue.length == 0)
        return false;
    var included = false;
    // Check if the tags include the search term
    included =
        included || tags.reduce((prev, tag) => prev || tag.includes(searchValue), false);
    // Check if the name includes the search term
    included = included || textOfNode(name).includes(searchValue);
    // Check if the description includes the search term
    included = included || textOfNode(description).includes(searchValue);
    // Return whether to exclude the setting based on the search
    return !included;
}
exports.filterSettingFromSearch = filterSettingFromSearch;
//# sourceMappingURL=filterSettingFromSearch.js.map