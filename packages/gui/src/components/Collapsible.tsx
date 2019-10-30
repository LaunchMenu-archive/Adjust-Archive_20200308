import {useState, useCallback, useMemo, FC, ReactNode} from "react";
import {React} from "../React";
import {IconButton} from "office-ui-fabric-react";
import {useTheme} from "../modules/theming/themer.type";
import {Box} from "./Box";

/**
 * Renders a a collapsible item
 */
export const Collapsible: FC<{
    /** The header of the collapsible content */
    header: ReactNode | ((isOpened?: boolean) => ReactNode);

    /** The contents to be collapsible */
    contents: ReactNode;
}> = ({header, contents}) => {
    const [isOpened, setOpened] = useState(true);
    const toggleOpened = useCallback(() => setOpened(open => !open), []);
    const theme = useTheme();

    // A method to render the arrow icon
    const renderIcon = useMemo(() => {
        const Icon = theme.getIcon("right");
        return () => (
            <Box
                class={isOpened ? "expanded" : "collapsed"}
                css={{
                    ">*": {
                        fontSize: 22,
                        transition: "0.1s",
                    },
                    "&.expanded>*": {
                        transform: "rotate(90deg)",
                    },
                }}>
                <Icon />
            </Box>
        );
    }, [isOpened]);

    // Render the header and children
    return (
        <Box>
            <Box onClick={toggleOpened} display="flex" alignItems="center">
                {header instanceof Function ? (
                    header(isOpened)
                ) : (
                    <>
                        <IconButton
                            iconProps={{iconName: "right"}}
                            title={isOpened ? "Collapse" : "Expand"}
                            ariaLabel={isOpened ? "Collapse" : "Expand"}
                            onRenderIcon={renderIcon}
                        />
                        <Box display="inline-block" padding="xs">
                            {header}
                        </Box>
                    </>
                )}
            </Box>
            <Box display={isOpened ? "block" : "none"} paddingLeft="m">
                {contents}
            </Box>
        </Box>
    );
};
