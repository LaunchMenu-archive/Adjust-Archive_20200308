Object.defineProperty(exports, "__esModule", { value: true });
const react_1 = require("react");
const React_1 = require("../../../../../React");
const Box_1 = require("../../../../../components/Box");
const office_ui_fabric_react_1 = require("office-ui-fabric-react");
const themer_type_1 = require("../../../../theming/themer.type");
exports.Category = ({ data }) => {
    const [isOpened, setOpened] = react_1.useState(true);
    const toggleOpened = react_1.useCallback(() => setOpened(open => !open), []);
    const theme = themer_type_1.useTheme();
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
    const header = data.module ? (data.module) : (React_1.React.createElement(Box_1.Box, { onClick: toggleOpened },
        React_1.React.createElement(office_ui_fabric_react_1.IconButton, { iconProps: { iconName: "right" }, title: isOpened ? "Collapse" : "Expand", ariaLabel: isOpened ? "Collapse" : "Expand", onRenderIcon: renderIcon }),
        data.name));
    return data.children ? (React_1.React.createElement(Box_1.Box, null,
        header,
        React_1.React.createElement(Box_1.Box, { display: isOpened ? "block" : "none", paddingLeft: "m" }, Object.values(data.children).map(child => (React_1.React.createElement(exports.Category, { key: child.name, data: child })))))) : (header);
};
//# sourceMappingURL=Category.js.map