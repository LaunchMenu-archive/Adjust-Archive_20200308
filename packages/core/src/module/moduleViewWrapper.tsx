import {cloneElement} from "react";

interface ViewWrapperProps {
    /**
     * The view to augment
     */
    view: JSX.Element;

    /**
     * The children to pass to the view
     */
    children: any;

    /**
     * Any additional parameters
     */
    [prop: string]: any;
}

/**
 * A wrapper to augment a module view (of a child module)
 * @param props The properties of the commponent
 */
export const ViewWrapper = ({view, children, ...props}: ViewWrapperProps) =>
    cloneElement(view, {...view.props, ...props}, children);
