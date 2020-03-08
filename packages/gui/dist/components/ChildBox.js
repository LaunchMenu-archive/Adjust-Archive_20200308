Object.defineProperty(exports, "__esModule", { value: true });
const React_1 = require("../React");
const Box_1 = require("./Box");
exports.childCss = {
    position: "absolute",
    left: 0,
    right: 0,
    top: 0,
    bottom: 0,
};
/**
 * A box element to use when you want to stretch your component the size that the parent module allows
 * @param props All normal Box properties
 */
exports.ChildBox = (props) => React_1.React.createElement(Box_1.Box, Object.assign({ css: exports.childCss }, props));
//# sourceMappingURL=ChildBox.js.map