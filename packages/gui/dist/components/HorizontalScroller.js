Object.defineProperty(exports, "__esModule", { value: true });
const React_1 = require("../React");
const react_1 = require("react");
/**
 * A component that allows for automatic horizontal scrolling
 * @param props The accepted props
 */
exports.HorizontalScroller = ({ children, stepSize = 10, stepDelay = 30, scrollStepSize = 30, showScrollArrows = true, enabled = true, }) => {
    const scrollElementRef = react_1.useRef(null);
    const interval = react_1.useRef(-1);
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
    // Return the element
    return (React_1.React.createElement("div", { className: "horizontalScroller", style: { whiteSpace: "nowrap", position: "relative" } },
        React_1.React.createElement("div", { className: "horizontalScrollerLeft", onMouseOver: scrollLeft, onMouseOut: stopScrolling, style: {
                top: 0,
                bottom: 0,
                left: 0,
                position: "absolute",
                width: 20,
                backgroundColor: "orange",
            } }),
        React_1.React.createElement("div", { className: "horizontalScrollerRight", onMouseOver: scrollRight, onMouseOut: stopScrolling, style: {
                top: 0,
                bottom: 0,
                right: 0,
                position: "absolute",
                width: 20,
                backgroundColor: "orange",
            } }),
        React_1.React.createElement("div", { className: "horizontalScrollerContent", ref: element => (scrollElementRef.current = element), style: { overflowX: "hidden" } }, children)));
};
//# sourceMappingURL=HorizontalScroller.js.map