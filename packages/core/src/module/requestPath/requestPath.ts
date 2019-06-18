import {Json} from "../../utils/_types/standardTypes";
import {RequestPathNode} from "./_types/requestPathNode";
import {ModuleID} from "../moduleID";

// Way of dealing with the cyclic dependency
let r;
function registry() {
    if (!r) r = require("../../registry/registry").default;
    return r;
}

// TODO: use CFG to match path, since now no '->' is allowed in any data
/**
 * The request path of a module, used for identifying and filtering module instances
 */
export class RequestPath {
    // The actual modules of the path
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

    constructor(path: RequestPath | string | ModuleID, data?: Json) {
        // If it's a request path, copy it's modules
        if (path instanceof RequestPath) this.nodes = path.nodes.concat();
        // If it's a module ID, combine it with the data
        else if (path instanceof ModuleID) this.nodes = [this.createNode(path, data)];
        // If it's a string, extract the module from the string
        else this.nodes = this.parseNodes(path);
    }

    /**
     * Creates a valid node object given all relevant data
     * @param moduleID The ID of the module
     * @param data The data that was passed to the request
     * @returns The created node
     */
    protected createNode(moduleID: ModuleID, data: Json): RequestPathNode {
        return {
            moduleID,
            requestData: data,
            getType: () => moduleID.getModuleClass().getConfig().type,
        };
    }

    // Data retrieval methods
    /**
     * Returns the module data spacified
     * @param index The index of the module data to retrieve
     * @returns The retrieved module data
     */
    public get(index?: number): RequestPathNode {
        // Assign the index the last index if not specified
        if (index == undefined) index = this.nodes.length - 1;

        // Make sure the index is in the proper range
        while (index < 0 && this.nodes.length > 0) index += this.nodes.length;
        while (index > this.nodes.length) index -= this.nodes.length;

        // Retrieve a copy of the ModulePath data
        return Object.assign({}, this.nodes[index]);
    }

    /**
     * Returns the class path spacified
     * @param index The index of the class path to retrieve
     * @returns The retrieved class path
     */
    public getClassPath(index?: number): string {
        return this.get(index).moduleID.getModulePath();
    }

    /**
     * Returns the number of modulePaths in the requestPath
     */
    public get length(): number {
        return this.nodes.length;
    }

    // 'mutation' methods
    /**
     * Creates a new RequestPath that's an extended version of this path
     * @param moduleID The ID of the module to extend the request path by
     * @param data The data of the module to extend the request path by
     * @returns The newly created RequestPath
     */
    public extend(moduleID: ModuleID, data: Json): RequestPath {
        const requestPath = new RequestPath(this);

        requestPath.nodes.push(this.createNode(moduleID, data));

        return requestPath;
    }

    /**
     * Creates a new RequestPath that's a reduced version of this path
     * @param count The number of modules to remove
     * @returns The newly created RequestPath
     */
    public reduce(count: number = 1): RequestPath {
        const requestPath = new RequestPath(this);

        requestPath.nodes.splice(requestPath.nodes.length - count, count);

        return requestPath;
    }

    // Parsing methods
    /**
     * Parses the string form of a request path into the ModulePath array
     * @param path The path to parse
     * @returns The ModulePath array created from the path
     */
    protected parseNodes(path: string): RequestPathNode[] {
        const dividers = this.getDeviders();

        const modulesData = path.split(dividers.node);
        return modulesData
            .filter(data => data.length > 0)
            .map(data => this.parseNode(data));
    }

    /**
     * Parses the string form of a module path into the ModulePath
     * @param moduleData The data to parse
     * @returns The ModulePath created from the data
     */
    protected parseNode(moduleData: string): RequestPathNode {
        const dividers = this.getDeviders();

        // Obtain the data
        const data = moduleData.split(dividers.data);
        if (data.length < 3) throw new Error("Incorrect data");
        if (data.length > 3) data[2] = data.splice(2).join(dividers.data);

        // Create a valid node
        return this.createNode(
            new ModuleID(data[0], Number(data[1])),
            JSON.parse(data[2])
        );
    }

    /**
     * Stringifies the requestPath, without loss of information
     * @returns The string representation of this requestPath
     */
    public toString(): string {
        const dividers = this.getDeviders();

        return this.nodes
            .map(modulePath => this.nodeToString(modulePath))
            .join(dividers.node);
    }

    /**
     * Stringifies a given modulePath, without loss of information
     * @param modulePath The module path to stringify
     * @returns The string representation of a ModulePath of this requestPath
     */
    public nodeToString(modulePath: RequestPathNode): string {
        const dividers = this.getDeviders();

        return [
            modulePath.moduleID.getModulePath(),
            modulePath.moduleID.getID(),
            JSON.stringify(modulePath.requestData),
        ].join(dividers.data);
    }

    /**
     * Returns the dividers used for stringification of the path
     */
    protected getDeviders(): {node: string; data: string} {
        return {node: "->", data: ":"};
    }
}
