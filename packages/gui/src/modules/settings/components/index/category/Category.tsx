import {useState, useCallback, useMemo} from "react";
import {React} from "../../../../../React";
import {Box} from "../../../../../components/Box";
import {ISettingsIndexTreeElements} from "./_types/ISettingsIndexTreeElements";
import {IconButton} from "office-ui-fabric-react";
import {useTheme} from "../../../../theming/themer.type";

export const Category = ({data}: {data: ISettingsIndexTreeElements}) => {
    const [isOpened, setOpened] = useState(true);
    const toggleOpened = useCallback(() => setOpened(open => !open), []);
    const theme = useTheme();
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

    const header = data.module ? (
        data.module
    ) : (
        <Box onClick={toggleOpened}>
            <IconButton
                iconProps={{iconName: "right"}}
                title={isOpened ? "Collapse" : "Expand"}
                ariaLabel={isOpened ? "Collapse" : "Expand"}
                onRenderIcon={renderIcon}
            />
            {data.name}
        </Box>
    );

    return data.children ? (
        <Box>
            {header}
            <Box display={isOpened ? "block" : "none"} paddingLeft="m">
                {Object.values(data.children).map(child => (
                    <Category key={child.name} data={child} />
                ))}
            </Box>
        </Box>
    ) : (
        header
    );
};
