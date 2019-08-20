import {React} from "../React";
import {useCallback, useRef, WheelEvent, useState} from "react";
import {Box} from "./Box";
import {useTheme} from "../modules/theming/themer.type";

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
    const theme = useTheme();
    const scrollElementRef = useRef(null as HTMLDivElement | null);
    const interval = useRef(-1);
    const [, forceUpdate] = useState({});

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

    const scroll = useCallback((e: WheelEvent) => {
        const el = scrollElementRef.current;
        if (el) {
            if (e.deltaY > 0)
                el.scrollLeft = Math.min(
                    el.scrollWidth - el.clientWidth,
                    el.scrollLeft + scrollStepSize
                );
            else el.scrollLeft = Math.max(0, el.scrollLeft - scrollStepSize);
        }
    }, []);

    const hasOverflow = useCallback(() => {
        const el = scrollElementRef.current;
        return el && el.scrollWidth - el.clientWidth < 0;
    }, []);

    const LeftIcon = theme.getIcon("left");
    const RightIcon = theme.getIcon("right");

    // Return the element
    return (
        <div
            className="horizontalScroller"
            onWheel={e => scroll(e)}
            style={{whiteSpace: "nowrap", position: "relative"}}>
            {hasOverflow() && enabled && (
                <>
                    <Box
                        className="horizontalScrollerLeft"
                        background="whiteTranslucent40"
                        onDragOver={scrollLeft}
                        onDragLeave={stopScrolling}
                        onMouseDown={scrollLeft}
                        onMouseUp={stopScrolling}
                        onMouseOut={stopScrolling}
                        css={{
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
                        }}>
                        {
                            <LeftIcon
                                css={{
                                    position: "absolute" as "absolute",
                                    top: "50%",
                                    left: "50%",
                                    transform: "translate(-50%, -50%)",
                                }}
                            />
                        }
                    </Box>
                    <Box
                        className="horizontalScrollerRight"
                        background="whiteTranslucent40"
                        onDragOver={scrollRight}
                        onDragLeave={stopScrolling}
                        onMouseDown={scrollRight}
                        onMouseUp={stopScrolling}
                        onMouseOut={stopScrolling}
                        css={{
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
                        }}>
                        {
                            <RightIcon
                                css={{
                                    position: "absolute" as "absolute",
                                    top: "50%",
                                    left: "50%",
                                    transform: "translate(-50%, -50%)",
                                }}
                            />
                        }
                    </Box>
                </>
            )}

            <div
                className="horizontalScrollerContent"
                ref={element => {
                    if (!scrollElementRef.current) {
                        scrollElementRef.current = element;
                        forceUpdate({});
                    }
                }}
                style={{overflow: "hidden"}}>
                {children}
            </div>
        </div>
    );
};
