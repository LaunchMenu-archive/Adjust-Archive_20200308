import CFG from "../../utils/CFG/CFG";
import CFGmatcher from "../../utils/CFG/CFGmatcher";
import {RequestPathPatternNode} from "./_types/requestPathPatternNode";
import {RequestPathNode} from "./_types/requestPathNode";
import {RequestPath} from "./requestPath";

export class RequestPathPattern {
    protected nodes: RequestPathPatternNode[];

    /**
     * Creates a requestPathPattern, to be used to filter/match requestPaths
     * @param path The pattern
     */
    constructor(pattern: RequestPathPattern | string) {
        if (pattern instanceof RequestPathPattern) this.nodes = pattern.nodes.concat();
        else this.nodes = this.parseNodes(pattern);
    }

    // Pattern usage methods
    /**
     * Returns whether or not the given requestPath matches this pattern
     * @param path - The path to test
     * @returns Whether or not the path matches the pattern
     */
    public test(requestPath: RequestPath | string): boolean {
        // Normalize the requestPath
        if (typeof requestPath == "string") requestPath = new RequestPath(requestPath);

        // Treat the pattern as sort of a NFA with multiple states,
        //  where every state is the pattern that could next be matched
        let states = [];

        // Helper method to insert only unique states
        const addState = (states, state) => {
            // Check if the state isn't already in there
            const containsState = !!states.find(
                s => s.index == state.index && s.matched == state.matched
            );

            // Don't insert if it is already present
            if (containsState) return;

            // Augment the state with the pattern
            state.pattern = this.nodes[state.index];
            if (!state.matched) state.matched = 0;

            // Add the state
            states.push(state);

            // Check if the pattern could match 0 times, if so also add the subsequent state
            if (state.pattern.matchTimes.min == 0 && state.index + 1 != this.nodes.length)
                addState(states, {index: state.index + 1, matched: 0});
        };

        // Add the first state
        addState(states, {index: 0});

        // Keep track of whether we are in a final state or not,
        //  if we just matched a final pattern, we are
        let finalStateReached = false;

        // Go through each module of the request path, and check if it matches
        for (var i = 0; i < requestPath.length; i++) {
            const modulePath = requestPath.get(i);

            // Compute the next states
            const nextStates = [];

            // Indicate that we are not in a final state
            finalStateReached = false;

            // Go through all states to determine the next state set
            states.forEach(state => {
                // Check the pattern
                const pattern = state.pattern;

                // Check if the pattern matches this module path
                if (!pattern.match(modulePath)) {
                    // The module failed to match, so this state leads to a dead end
                    return;
                }

                // Check if this state was a final state
                const isFinalState = state.index == this.nodes.length - 1;

                // Check if the pattern matched the minimum required number of times
                if (state.matched + 1 >= pattern.matchTimes.min) {
                    // If so, go to the next pattern if there is any
                    if (!isFinalState)
                        addState(nextStates, {
                            index: state.index + 1,
                        });
                }

                // Check if the pattern hasn't yet matched the maximum allowed number of times
                if (state.matched + 1 < pattern.matchTimes.max) {
                    // If so, match the pattern more
                    addState(nextStates, {
                        index: state.index,
                        matched: state.matched + 1,
                    });
                }

                // If this was a final state, mark finalStateReached to be true
                if (isFinalState) finalStateReached = true;
            });

            // Replace the current state by the next state
            states = nextStates;
        }

        // Return whether we stopped in a final state
        return finalStateReached;
    }

    /**
     * Compare the priority with another pattern for priority sorting
     * @param pattern - The pattern to compare this pattern to
     * @returns The priority
     */
    public comparePriority(pattern: RequestPathPattern) {
        // First check what the number of exact module matches for both patterns is
        const thisMatchCount = this.nodes.reduce(
            (number, module) => module.priorityWeight + number,
            0
        );
        const otherMatchCount = pattern.nodes.reduce(
            (number, module) => module.priorityWeight + number,
            0
        );

        // IF this match count is not equal, return the most precise pattern
        if (thisMatchCount != otherMatchCount)
            return thisMatchCount > otherMatchCount ? 1 : -1;

        // If the patterns are as precise as one and another, prioritise on precision at the start

        // Check how for we should at most loop
        const max = Math.max(pattern.nodes.length, this.nodes.length);

        // Loop through all the patterns
        for (var i = 0; i < max; i++) {
            // Get both patterns
            const thisPattern = this.nodes[i];
            const otherPattern = pattern.nodes[i];

            // Check if both have a pattern
            if (!thisPattern) return -1;
            if (!otherPattern) return 1;

            // Check what pattern is more precise
            if (thisPattern.priorityWeight > otherPattern.priorityWeight) return 1;
            if (thisPattern.priorityWeight < otherPattern.priorityWeight) return -1;
        }

        // The patterns are exaaactly as precise
        return 0;
    }

    // data retrieval methods
    /**
     * Returns the ModulePath data spacified
     * @param index The index of the ModulePath to retrieve
     */
    protected get(index?: number): RequestPathPatternNode {
        // Assign the index the last index if not specified
        if (index == undefined) index = this.nodes.length - 1;

        // Make sure the index is in the proper range
        while (index < 0 && this.nodes.length > 0) index += this.nodes.length;
        while (index > this.nodes.length) index -= this.nodes.length;

        // Retrieve a copy of the ModulePath data
        return Object.assign({}, this.nodes[index]);
    }

    // Parsing methods
    /**
     * Parses the string form of a request path into the ModulePath array
     * @param path The path to parse
     */
    protected parseNodes(path: string): RequestPathPatternNode[] {
        const dividers = this.getDeviders();

        const nodesData = path.split(dividers.node);
        return nodesData.map(data => this.parseNode(data));
    }

    /**
     * Parses the string form of a node into the object form of the node
     * @param nodePatternData The data to parse
     * @returns The node created from the data
     */
    protected parseNode(nodePatternData: string): RequestPathPatternNode {
        // Get the cfg to use to create the matcher
        const cfg: CFG = (<any>this).__proto__.getGrammar();

        // Create a cfg matcher
        const cfgMatcher = new CFGmatcher(cfg, nodePatternData);

        // Match the input text
        const match = cfgMatcher.stepAll();

        // Check if we successfully created a match
        if (match instanceof Error) {
            throw match;
        } else {
            // Go through the tree to create the matcher and the part
            match.walkTree(stackItem => {
                // Get the definition of the stack item
                const definition = stackItem.definition;

                // Get the build of all children (which was created by this method itself, recursively)
                const children = stackItem.match.parts.map(part => {
                    // Check if the child is a stackItem, and if so return its build
                    if (part.variableMatch) return part.build;
                    // Otherwise return the regex match
                    else return part.match;
                });

                // Create the matcher of this stackItem
                const matcher = definition.createMatcher(children);

                // Get the matchTimes of this item
                let matchTimes = definition.matchTimes;
                if (typeof matchTimes == "function") matchTimes = matchTimes(children);

                // Get the pioerityWeight of this item
                let priorityWeight = definition.priorityWeight;
                if (typeof priorityWeight == "function")
                    priorityWeight = priorityWeight(children);

                // Get the list of modules that could possibly match the pattern
                const modules = definition.getModuleList(children);

                // Get the source text
                const range = stackItem.match.range;
                const subPattern = nodePatternData.substring(range.start, range.end);

                // Combine all the data into one build object
                const build = {
                    match: matcher,
                    matchTimes: matchTimes,
                    priorityWeight: priorityWeight,
                    pattern: subPattern,
                    modules: modules,
                };

                // Store the build
                stackItem.build = build;
            });

            // Return the build of the root
            return match.root.build;
        }
    }

    /**
     * Stringifies the RequestPathPattern, without loss of information
     * @returns The string representation of this request path pattern
     */
    public toString(): string {
        const dividers = this.getDeviders();

        return this.nodes
            .map(modulePath => this.nodeToString(modulePath))
            .join(dividers.node);
    }

    /**
     * Stringifies a given node, without loss of information
     * @param node The node to stringify
     * @returns The string representation of a node of this request path pattern
     */
    public nodeToString(node: RequestPathPatternNode): string {
        const dividers = this.getDeviders();

        return node.pattern;
    }

    /**
     * Returns the dividers used for stringification of the path
     */
    protected getDeviders(): {node: string} {
        return {node: "->"};
    }

    // static methods
    protected static cfg;

    /**
     * Returns all the rules for how to interpret each node of the request path pattern
     * @returns A list of parse patterns
     */
    private static getGrammar(): CFG {
        // Only create the grammar if it wasn't created already
        if (this.cfg) return this.cfg;

        // Some type declartions to handle the currently non ts grammar system
        type Pattern = Array<string | RequestPathPatternNode>;
        type Rule = {
            // A type name that isn't used anywhere, it just helps to organize
            type: string;

            // A list of either variable names or regex to match
            pattern: Array<string | RegExp>;

            // How often this path part should be matched in the path
            matchTimes?:
                | {min: number; max: number}
                | {(pattern: Pattern): {min: number; max: number}};

            // A function that creates the match function
            createMatcher: (pattern: Pattern) => (modulePath: RequestPathNode) => boolean;

            // A function that creates a list of modules that could satisfy the pattern
            getModuleList: (pattern: Pattern) => string[];

            // The weight of the this part when comparing requestPathPatterns' priorities
            priorityWeight: number | {(pattern: Pattern): number};
        };

        // Declare the grammar and semantics
        // prettier-ignore
        const rules: {[variable: string]: Rule[]} = {
            "part": [{
                type: "any number of times",
                pattern: ["exp", /\*\s*/],
                matchTimes: {min:0, max:Infinity},
                createMatcher: pattern => (<RequestPathPatternNode> pattern[0]).match,
                getModuleList: pattern => (<RequestPathPatternNode> pattern[0]).modules,
                priorityWeight: pattern => (<RequestPathPatternNode> pattern[0]).priorityWeight,
            },{
                type: "at least once",
                pattern: ["exp", /\+\s*/],
                matchTimes: {min:1, max:Infinity},
                createMatcher: pattern => (<RequestPathPatternNode> pattern[0]).match,
                getModuleList: pattern => (<RequestPathPatternNode> pattern[0]).modules,
                priorityWeight: pattern => (<RequestPathPatternNode> pattern[0]).priorityWeight,
            },{
                type: "n times",
                pattern: ["exp", /\s*\{\s*/, /\d+\s*/, /\}\s*/],
                matchTimes: pattern => ({min:Number(pattern[2]), max:Number(pattern[2])}),
                createMatcher: pattern => (<RequestPathPatternNode> pattern[0]).match,
                getModuleList: pattern => (<RequestPathPatternNode> pattern[0]).modules,
                priorityWeight: pattern => (<RequestPathPatternNode> pattern[0]).priorityWeight,
            },{
                type: "between n and m times",
                pattern: ["exp", /\s*\{\s*/, /\d+\s*/, /\,\s*/, /\d+\s*/, /\s*\}\s*/],
                matchTimes: pattern => ({min:Number(pattern[2]), max:Number(pattern[4])}),
                createMatcher: pattern => (<RequestPathPatternNode> pattern[0]).match,
                getModuleList: pattern => (<RequestPathPatternNode> pattern[0]).modules,
                priorityWeight: pattern => (<RequestPathPatternNode> pattern[0]).priorityWeight,
            },{
                type: "exactly once",
                pattern: ["exp"],
                matchTimes: {min:1, max:1},
                createMatcher: pattern => (<RequestPathPatternNode> pattern[0]).match,
                getModuleList: pattern => (<RequestPathPatternNode> pattern[0]).modules,
                priorityWeight: pattern => (<RequestPathPatternNode> pattern[0]).priorityWeight,
            }],

            "exp": [{
                type: "group",
                pattern: [/\s*\(/, "exp", /\)\s*/],
                createMatcher: pattern => (<RequestPathPatternNode> pattern[1]).match,
                getModuleList: pattern => (<RequestPathPatternNode> pattern[1]).modules,
                priorityWeight: 1,
            },{
                type: "or",
                pattern: ["exp", /\|/, "exp"],
                createMatcher: pattern => pathPart => 
                    (<RequestPathPatternNode> pattern[0]).match(pathPart) || 
                    (<RequestPathPatternNode> pattern[2]).match(pathPart),
                getModuleList: pattern => 
                    (<RequestPathPatternNode> pattern[0]).modules
                        .concat((<RequestPathPatternNode> pattern[2]).modules),
                priorityWeight: 1,
            },{
                type: "not",
                pattern: [/\s*\!/, "exp"],
                createMatcher: pattern => pathPart => 
                    !(<RequestPathPatternNode> pattern[1]).match(pathPart),
                getModuleList: pattern => [],
                priorityWeight: 1,
            },{
                type: "moduleType",
                pattern: [/\s*#([\w\/\\\.]+)\s*/],
                createMatcher: pattern => pathPart => pattern[0][1] == pathPart.getType(),
                getModuleList: pattern => [],
                priorityWeight: 0.5,
            },{
                type: "module",
                pattern: [/\s*([\w\/\\\.]+)\s*/],
                createMatcher: pattern => pathPart => pattern[0][1] == pathPart.moduleID.getModulePath,
                getModuleList: pattern => [pattern[0][1]],
                priorityWeight: 1,
            },{
                type: "anything",
                pattern: [],
                createMatcher: pattern => pathPart => true,
                getModuleList: pattern => [],
                priorityWeight: 0.01,
            }],
        }

        this.cfg = new CFG(rules, "part");

        // Also return this cfg
        return this.cfg;
    }
}
