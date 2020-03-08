/// <reference path="../React.d.ts" />
/// <reference types="react" />
/**
 * A component that allows for automatic horizontal scrolling
 * @param props The accepted props
 */
export declare const HorizontalScroller: ({ children, stepSize, stepDelay, scrollStepSize, showScrollArrows, enabled, }: {
    /**
     * The children of the element
     */
    children?: import("react").ReactNode;
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
}) => JSX.Element;
