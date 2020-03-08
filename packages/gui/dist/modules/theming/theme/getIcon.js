Object.defineProperty(exports, "__esModule", { value: true });
/**
 * A function to retrieve an icon component from a string name, uses raect-icons
 * @param icon The path to the icon
 * @returns The icon component
 */
function getIcon(icon) {
    let match;
    if ((match = icon.match(/(react-icons\/md)\/(.*)/))) {
        return require(match[1])[match[2]];
    }
}
exports.getIcon = getIcon;
//# sourceMappingURL=getIcon.js.map