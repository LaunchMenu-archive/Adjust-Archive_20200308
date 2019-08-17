/**
 * A function to retrieve an icon component from a string name, uses raect-icons
 * @param icon The path to the icon
 * @returns The icon component
 */
export function getIcon(icon: string): React.FunctionComponent | React.ComponentClass {
    let match;
    if ((match = icon.match(/(react-icons\/md)\/(.*)/))) {
        return require(match[1])[match[2]];
    }
}
