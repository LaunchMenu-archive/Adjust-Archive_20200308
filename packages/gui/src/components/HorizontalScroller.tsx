import {React} from "../React";
import {useCallback, useRef} from "react";

/**
 * A component that allows for automatic horizontal scrolling
 * @param props The accepted props
 */
export const HorizontalScroller = ({
    children,
    stepSize = 10,
    stepDelay = 30,
    scrollStepSize = 30,
    showScrollArrows = true,
    enabled = true,
}: {
    /**
     * The children of the element
     */
    children?: React.ReactNode;
    /**
     * How big each automatic scroll increment should be
     */
    stepSize?: number;
    /**
     * How much time there should be between each step
     */
    stepDelay?: number;
    /**
     * How far each scroll event should progress
     */
    scrollStepSize?: number;
    /**
     * Whether or not scrolling is enabled
     */
    enabled?: boolean;
    /**
     * Whether or not the scroll arrows should be shown
     */
    showScrollArrows?: boolean;
}): JSX.Element => {
    const scrollElementRef = useRef(null as HTMLDivElement | null);
    const interval = useRef(-1);

    // Define the event handlers
    const stopScrolling = () => {
        clearTimeout(interval.current);
    };

    const scrollLeft = useCallback(() => {
        stopScrolling();
        interval.current = setInterval(() => {
            const el = scrollElementRef.current;
            if (el) el.scrollLeft = Math.max(0, el.scrollLeft - stepSize);
        }, stepDelay) as any;
    }, [stepSize, stepDelay]);

    const scrollRight = useCallback(() => {
        stopScrolling();
        interval.current = setInterval(() => {
            const el = scrollElementRef.current;
            if (el)
                el.scrollLeft = Math.min(
                    el.scrollWidth - el.clientWidth,
                    el.scrollLeft + stepSize
                );
        }, stepDelay) as any;
    }, [stepSize, stepDelay]);

    // Return the element
    return (
        <div
            className="horizontalScroller"
            style={{whiteSpace: "nowrap", position: "relative"}}>
            <div
                className="horizontalScrollerLeft"
                onMouseOver={scrollLeft}
                onMouseOut={stopScrolling}
                style={{
                    top: 0,
                    bottom: 0,
                    left: 0,
                    position: "absolute",
                    width: 20,
                    backgroundColor: "orange",
                }}
            />
            <div
                className="horizontalScrollerRight"
                onMouseOver={scrollRight}
                onMouseOut={stopScrolling}
                style={{
                    top: 0,
                    bottom: 0,
                    right: 0,
                    position: "absolute",
                    width: 20,
                    backgroundColor: "orange",
                }}
            />
            <div
                className="horizontalScrollerContent"
                ref={element => (scrollElementRef.current = element)}
                style={{overflowX: "hidden"}}>
                {children}
            </div>
        </div>
    );
};
