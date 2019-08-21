Object.defineProperty(exports, "__esModule", { value: true });
const getAttributes_1 = require("./getAttributes");
/**
 * All the acceptable dom attributes, mapped to either true if the DOM camelcase attribute name is the same,
 * or a string if it's different
 */
exports.domAttributes = {
    children: true,
    className: true,
    elRef: "ref",
    style: true,
    draggable: true,
};
/**
 * Retrieves all aplicable attributes
 * @param props The props to retrieve the data from
 * @returns The css props
 */
function getDomAttributes(props) {
    return getAttributes_1.getAttribute(props, key => {
        if (exports.domAttributes[key])
            return exports.domAttributes[key];
        else if (key.match(/^on/))
            return true;
    }, (value) => value);
}
exports.getDomAttributes = getDomAttributes;
//# sourceMappingURL=getDomAttributes.js.map