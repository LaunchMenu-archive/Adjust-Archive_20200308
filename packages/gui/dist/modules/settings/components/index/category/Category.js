Object.defineProperty(exports, "__esModule", { value: true });
const React_1 = require("../../../../../React");
const Collapsible_1 = require("../../../../../components/Collapsible");
/**
 * Renders a signle category
 */
exports.Category = ({ data }) => {
    // Render either the module if at a leave, or a collapsible section of the category
    return (data.module || (React_1.React.createElement(Collapsible_1.Collapsible, { header: data.name, contents: Object.values(data.children).map(child => (React_1.React.createElement(exports.Category, { key: child.name, data: child }))) })));
};
//# sourceMappingURL=Category.js.map