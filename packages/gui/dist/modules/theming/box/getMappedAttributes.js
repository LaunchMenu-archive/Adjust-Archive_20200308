Object.defineProperty(exports, "__esModule", { value: true });
const getAttributes_1 = require("./getAttributes");
/**
 * All the standard attributes, mapped to either true if the css camelcase name is the same,
 * or a string if it's different
 */
exports.mappedAttributes = {
    width: true,
    height: true,
    display: true,
    position: true,
    verticalAlign: true,
    flexDirection: true,
    flexWrap: true,
    justifyContent: true,
    alignItems: true,
    alignContent: true,
    alignSelf: true,
    zIndex: true,
    order: true,
    flexGrow: true,
    flexShrink: true,
    flexBasis: true,
    flex: true,
    cursor: true,
};
/**
 * Retrieves all attributes their css equivalent
 * @param props The props to retrieve the data from
 * @returns The css props
 */
function getMappedAttributes(props) {
    return getAttributes_1.getAttribute(props, exports.mappedAttributes, (value) => value);
}
exports.getMappedAttributes = getMappedAttributes;
//# sourceMappingURL=getMappedAttributes.js.map