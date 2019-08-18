Object.defineProperty(exports, "__esModule", { value: true });
const React_1 = require("../React");
const Box_1 = require("./Box");
exports.parentCss = {
    position: "relative",
};
/**
 * A box element to use when you want to allow your child module to stretch and fill this area
 * @param props All normal Box properties
 */
exports.ParentBox = (props) => React_1.React.createElement(Box_1.Box, Object.assign({ css: exports.parentCss }, props));
//# sourceMappingURL=ParentBox.js.map