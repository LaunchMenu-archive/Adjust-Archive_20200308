var __rest = (this && this.__rest) || function (s, e) {
    var t = {};
    for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0)
        t[p] = s[p];
    if (s != null && typeof Object.getOwnPropertySymbols === "function")
        for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) {
            if (e.indexOf(p[i]) < 0 && Object.prototype.propertyIsEnumerable.call(s, p[i]))
                t[p[i]] = s[p[i]];
        }
    return t;
};
Object.defineProperty(exports, "__esModule", { value: true });
const react_1 = require("react");
/**
 * A wrapper to augment a module view (of a child module)
 * @param props The properties of the commponent
 */
exports.ViewWrapper = (_a) => {
    var { view, children } = _a, props = __rest(_a, ["view", "children"]);
    return react_1.cloneElement(view, Object.assign({}, view.props, props), children);
};
//# sourceMappingURL=moduleViewWrapper.js.map