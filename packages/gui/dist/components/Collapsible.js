Object.defineProperty(exports, "__esModule", { value: true });
const react_1 = require("react");
const React_1 = require("../React");
const office_ui_fabric_react_1 = require("office-ui-fabric-react");
const themer_type_1 = require("../modules/theming/themer.type");
const Box_1 = require("./Box");
/**
 * Renders a a collapsible item
 */
exports.Collapsible = ({ header, contents }) => {
    const [isOpened, setOpened] = react_1.useState(true);
    const toggleOpened = react_1.useCallback(() => setOpened(open => !open), []);
    const theme = themer_type_1.useTheme();
    // A method to render the arrow icon
    const renderIcon = react_1.useMemo(() => {
        const Icon = theme.getIcon("right");
        return () => (React_1.React.createElement(Box_1.Box, { class: isOpened ? "expanded" : "collapsed", css: {
                ">*": {
                    fontSize: 22,
                    transition: "0.1s",
                },
                "&.expanded>*": {
                    transform: "rotate(90deg)",
                },
            } },
            React_1.React.createElement(Icon, null)));
    }, [isOpened]);
    // Render the header and children
    return (React_1.React.createElement(Box_1.Box, null,
        React_1.React.createElement(Box_1.Box, { onClick: toggleOpened, display: "flex", alignItems: "center" }, header instanceof Function ? (header(isOpened)) : (React_1.React.createElement(React_1.React.Fragment, null,
            React_1.React.createElement(office_ui_fabric_react_1.IconButton, { iconProps: { iconName: "right" }, title: isOpened ? "Collapse" : "Expand", ariaLabel: isOpened ? "Collapse" : "Expand", onRenderIcon: renderIcon }),
            React_1.React.createElement(Box_1.Box, { display: "inline-block", padding: "xs" }, header)))),
        React_1.React.createElement(Box_1.Box, { display: isOpened ? "block" : "none", paddingLeft: "m" }, contents)));
};
//# sourceMappingURL=Collapsible.js.map