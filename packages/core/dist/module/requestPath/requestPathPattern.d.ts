import { RequestPathPatternNode } from "./_types/requestPathPatternNode";
import { RequestPath } from "./requestPath";
export declare class RequestPathPattern {
    protected nodes: RequestPathPatternNode[];
    /**
     * Creates a requestPathPattern, to be used to filter/match requestPaths
     * @param path The pattern
     */
    constructor(pattern: RequestPathPattern | string);
    /**
     * Returns whether or not the given requestPath matches this pattern
     * @param path - The path to test
     * @returns Whether or not the path matches the pattern
     */
    test(requestPath: RequestPath | string): boolean;
    /**
     * Compare the priority with another pattern for priority sorting
     * @param pattern - The pattern to compare this pattern to
     * @returns The priority
     */
    comparePriority(pattern: RequestPathPattern): 1 | -1 | 0;
    /**
     * Returns the ModulePath data spacified
     * @param index The index of the ModulePath to retrieve
     */
    protected get(index?: number): RequestPathPatternNode;
    /**
     * Parses the string form of a request path into the ModulePath array
     * @param path The path to parse
     */
    protected parseNodes(path: string): RequestPathPatternNode[];
    /**
     * Parses the string form of a node into the object form of the node
     * @param nodePatternData The data to parse
     * @returns The node created from the data
     */
    protected parseNode(nodePatternData: string): RequestPathPatternNode;
    /**
     * Stringifies the RequestPathPattern, without loss of information
     * @returns The string representation of this request path pattern
     */
    toString(): string;
    /**
     * Stringifies a given node, without loss of information
     * @param node The node to stringify
     * @returns The string representation of a node of this request path pattern
     */
    nodeToString(node: RequestPathPatternNode): string;
    /**
     * Returns the dividers used for stringification of the path
     */
    protected getDeviders(): {
        node: string;
    };
    protected static cfg: any;
    /**
     * Returns all the rules for how to interpret each node of the request path pattern
     * @returns A list of parse patterns
     */
    private static getGrammar;
}
