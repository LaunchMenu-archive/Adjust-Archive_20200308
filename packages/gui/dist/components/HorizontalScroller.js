Object.defineProperty(exports, "__esModule", { value: true });
const React_1 = require("../React");
const react_1 = require("react");
const Box_1 = require("./Box");
const themer_type_1 = require("../modules/theming/themer.type");
/**
 * A component that allows for automatic horizontal scrolling
 * @param props The accepted props
 */
exports.HorizontalScroller = ({ children, stepSize = 10, stepDelay = 30, scrollStepSize = 30, showScrollArrows = true, enabled = true, }) => {
    const theme = themer_type_1.useTheme();
    const scrollElementRef = react_1.useRef(null);
    const interval = react_1.useRef(-1);
    const [, forceUpdate] = react_1.useState({});
    // Define the event handlers
    const stopScrolling = () => {
        clearTimeout(interval.current);
    };
    const scrollLeft = react_1.useCallback(() => {
        stopScrolling();
        interval.current = setInterval(() => {
            const el = scrollElementRef.current;
            if (el)
                el.scrollLeft = Math.max(0, el.scrollLeft - stepSize);
        }, stepDelay);
    }, [stepSize, stepDelay]);
    const scrollRight = react_1.useCallback(() => {
        stopScrolling();
        interval.current = setInterval(() => {
            const el = scrollElementRef.current;
            if (el)
                el.scrollLeft = Math.min(el.scrollWidth - el.clientWidth, el.scrollLeft + stepSize);
        }, stepDelay);
    }, [stepSize, stepDelay]);
    const scroll = react_1.useCallback((e) => {
        const el = scrollElementRef.current;
        if (el) {
            if (e.deltaY > 0)
                el.scrollLeft = Math.min(el.scrollWidth - el.clientWidth, el.scrollLeft + scrollStepSize);
            else
                el.scrollLeft = Math.max(0, el.scrollLeft - scrollStepSize);
        }
    }, []);
    const hasOverflow = react_1.useCallback(() => {
        const el = scrollElementRef.current;
        return el && el.scrollWidth - el.clientWidth < 0;
    }, []);
    const LeftIcon = theme.getIcon("left");
    const RightIcon = theme.getIcon("right");
    // Return the element
    return (React_1.React.createElement("div", { className: "horizontalScroller", onWheel: e => scroll(e), style: { whiteSpace: "nowrap", position: "relative" } },
        hasOverflow() && enabled && (React_1.React.createElement(React_1.React.Fragment, null,
            React_1.React.createElement(Box_1.Box, { className: "horizontalScrollerLeft", background: "whiteTranslucent40", onDragOver: scrollLeft, onDragLeave: stopScrolling, onMouseDown: scrollLeft, onMouseUp: stopScrolling, onMouseOut: stopScrolling, css: {
                    top: 0,
                    bottom: 0,
                    left: 0,
                    position: "absolute",
                    width: 20,
                    opacity: showScrollArrows ? 1 : 0,
                    zIndex: 1,
                    "&:hover": {
                        backgroundColor: theme.getColor("white"),
                    },
                } }, React_1.React.createElement(LeftIcon, { css: {
                    position: "absolute",
                    top: "50%",
                    left: "50%",
                    transform: "translate(-50%, -50%)",
                } })),
            React_1.React.createElement(Box_1.Box, { className: "horizontalScrollerRight", background: "whiteTranslucent40", onDragOver: scrollRight, onDragLeave: stopScrolling, onMouseDown: scrollRight, onMouseUp: stopScrolling, onMouseOut: stopScrolling, css: {
                    top: 0,
                    bottom: 0,
                    right: 0,
                    position: "absolute",
                    width: 20,
                    opacity: showScrollArrows ? 1 : 0,
                    zIndex: 1,
                    "&:hover": {
                        backgroundColor: theme.getColor("white"),
                    },
                } }, React_1.React.createElement(RightIcon, { css: {
                    position: "absolute",
                    top: "50%",
                    left: "50%",
                    transform: "translate(-50%, -50%)",
                } })))),
        React_1.React.createElement("div", { className: "horizontalScrollerContent", ref: element => {
                if (!scrollElementRef.current) {
                    scrollElementRef.current = element;
                    forceUpdate({});
                }
            }, style: { overflow: "hidden" } }, children)));
};
//# sourceMappingURL=HorizontalScroller.js.map