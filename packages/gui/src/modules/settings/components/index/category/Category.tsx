import {React} from "../../../../../React";
import {ISettingsIndexTreeElements} from "./_types/ISettingsIndexTreeElements";
import {Collapsible} from "../../../../../components/Collapsible";

/**
 * Renders a signle category
 */
export const Category = ({data}: {data: ISettingsIndexTreeElements}) => {
    // Render either the module if at a leave, or a collapsible section of the category
    return (
        data.module || (
            <Collapsible
                header={data.name}
                contents={Object.values(data.children).map(child => (
                    <Category key={child.name} data={child} />
                ))}
            />
        )
    );
};
