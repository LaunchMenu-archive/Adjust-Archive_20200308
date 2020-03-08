import { Json } from "../../utils/_types/standardTypes";
import { RequestPathNode } from "./_types/requestPathNode";
import { ModuleID } from "../moduleID";
/**
 * The request path of a module, used for identifying and filtering module instances
 */
export declare class RequestPath {
    protected nodes: RequestPathNode[];
    /**
     * Creates a request path that can be used to keep track of the request tree
     * @param moduleID The ID of module that's the start of this path
     * @param data The request data of the root of this request path
     */
    constructor(moduleID: ModuleID, data?: Json);
    /**
     * Creates a request path that can be used to keep track of the request tree
     * @param path The path in either string or actual path form
     */
    constructor(path: RequestPath | string);
    /**
     * Creates a valid node object given all relevant data
     * @param moduleID The ID of the module
     * @param data The data that was passed to the request
     * @returns The created node
     */
    protected createNode(moduleID: ModuleID, data: Json): RequestPathNode;
    /**
     * Returns the module data spacified
     * @param index The index of the module data to retrieve
     * @returns The retrieved module data
     */
    get(index?: number): RequestPathNode;
    /**
     * Returns the class path spacified
     * @param index The index of the class path to retrieve
     * @returns The retrieved class path
     */
    getClassPath(index?: number): string;
    /**
     * Returns the number of modulePaths in the requestPath
     */
    readonly length: number;
    /**
     * Creates a new RequestPath that's an extended version of this path
     * @param moduleID The ID of the module to extend the request path by
     * @param data The data of the module to extend the request path by
     * @returns The newly created RequestPath
     */
    extend(moduleID: ModuleID, data: Json): RequestPath;
    /**
     * Creates a new RequestPath that's a reduced version of this path
     * @param count The number of modules to remove
     * @returns The newly created RequestPath
     */
    reduce(count?: number): RequestPath;
    /**
     * Parses the string form of a request path into the ModulePath array
     * @param path The path to parse
     * @returns The ModulePath array created from the path
     */
    protected parseNodes(path: string): RequestPathNode[];
    /**
     * Parses the string form of a module path into the ModulePath
     * @param moduleData The data to parse
     * @returns The ModulePath created from the data
     */
    protected parseNode(moduleData: string): RequestPathNode;
    /**
     * Stringifies the requestPath, without loss of information
     * @returns The string representation of this requestPath
     */
    toString(): string;
    /**
     * Stringifies a given modulePath, without loss of information
     * @param modulePath The module path to stringify
     * @returns The string representation of a ModulePath of this requestPath
     */
    nodeToString(modulePath: RequestPathNode): string;
    /**
     * Returns the dividers used for stringification of the path
     */
    protected getDeviders(): {
        node: string;
        data: string;
    };
}
