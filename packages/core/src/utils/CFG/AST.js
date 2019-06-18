/**
 * This will only be here temporarily, untill Empirlver V2 is in a better state
 */
export default class AST {
    /**
     * Stores the data of the AST and provides relevant method(s...)
     * @param {string} input - The text to match using a grammar
     * @param {stackItem} root - The root stackItem of the match for the input string
     * @constructs AST
     */
    constructor(input, root) {
        this.input = input;
        this.root = root;
    }

    /**
     * Walks along the tree and performs the passed functions on its contents
     * @param {function} [postChildFunc] - The method to perform after the methods have been performed on the stackItem's children
     * @param {function} [preChildFunc] - The method to perform before the methods have been performed on the stackItem's children
     * @param {Object} [stackItem=root] - The stackItem to perform the methods on
     */
    walkTree(postChildFunc, preChildFunc, stackItem) {
        // If no stackItem was specified, assume we should start at the root
        if (!stackItem) stackItem = this.root;

        // Check if a preChildFunc method was passed
        if (preChildFunc) {
            // If so, execute it on the stackItem
            preChildFunc.call(stackItem, stackItem);
        }

        // Go through all parts of the stackItem
        stackItem.match.parts.forEach(part => {
            // Check if the part is a stackItem itself
            if (part.variableMatch) {
                // If so, recurse on it
                this.walkTree(postChildFunc, preChildFunc, part);
            }
        });

        // Check if a postChildFunc method was passed
        if (postChildFunc) {
            // If so, execute it on the stackItem
            postChildFunc.call(stackItem, stackItem);
        }
    }
}
