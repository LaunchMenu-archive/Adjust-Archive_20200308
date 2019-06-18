/**
 * This will only be here temporarily, untill Empirlver V2 is in a better state
 */
import AST from "./AST";
export default class CFGmatcher {
    /**
     * Matches a certain input using the passed context free grammar
     * @param {CFG} grammar - The grammar to use to match the string
     * @param {string} input - The string to match
     * @constructs CFGMatcher
     */
    constructor(grammar, input) {
        // Store the grammar
        this.grammar = grammar;

        // Enables debug messages when set to true
        this.debug = false;

        // Create variables used for the AST construction
        this.index = 0;
        this.stack = [];
        this.cache = {};
        this.furthestFound = {index: -1};
        this.finished = false;
        this.finishedSuccesfully = false;

        // Put the start variable on the stack
        this.pushStack(
            this.createchildStackItem(grammar.getStartVariable(), 0)
        );

        // Create an abstract syntax tree to store the result
        this.ast = new AST(input, this.stack[0]);
    }

    /**
     * Executes a single step in the matching process
     * @returns {boolean} Returns whether or not the matching has finished
     */
    step() {
        // Don't step if we already finished
        if (this.finished) return true;

        // Get the top of the stack
        let top = this.stack[this.stack.length - 1];

        if (!top.definition) {
            this.popStack(false);
            return;
        }

        // Get the part index
        let partIndex = top.match.parts.length;

        // If this index is 0 (index 1 for inflation attempt) and attempt 0,
        //  this stackItem has just been pushed, see if caching can be used
        //  (caching occures in teh popStack method)
        if (partIndex == 0 && top.attempt == 0 && !top.isInflationAttempt) {
            // Check if there is an cached item, and if so, use it
            if (this.checkCache()) {
                return;
            }
        }

        // Check what part should come next
        const part = top.definition.pattern[partIndex];
        if (part) {
            if (part.regex) {
                // If the part is a regular expression, try to match it
                const match = this.expect(part);
                if (match) {
                    // If a match could be found, add it to the parts
                    if (partIndex == 0) {
                        top.match.range.start = match.range.start;
                    }
                    top.match.parts.push(match);
                } else {
                    // Otherwise, this pattern couldn't be matched, move to the next definition
                    this.nextAttempt();
                }
            } else if (part.variable) {
                // If the part is an object, put its variable as a child match on the stack
                this.pushStack(this.createchildStackItem(part, 0)); // The child will automatically be added or go to the nextAttempt, when popped
            }
        } else {
            // If there is no more part to match, finish this match successfully
            this.popStack(true);
        }
    }

    /**
     * Indicate that we expected this matcher at the current index
     * @param {Object} match - The item we expected to find at the index
     * @returns {(Object|undefined)} Returns an object with the match if it found any here
     */
    expect(match) {
        // Extract the regex
        const regex = match.stickyRegex;

        // Make sure the regex only tries the location we are currently at
        regex.lastIndex = this.index;

        // Perform the regex test
        var match = regex.exec(this.ast.input);
        if (match) {
            // Output a message that can be used for debugging, if enabled
            if (this.debug) console.log("Matched", match.index, regex, match);

            // If a match was found, increase the index
            this.index = match.index + match[0].length;

            // Remove the input, as this will otherwise require ~ O(n^2) storage space
            delete match.input;

            // Check if we gotten further than the previous furthest
            if (this.index > this.furthestFound.index) {
                // If so, get the top of the stack
                const top = this.stack[this.stack.length - 1];

                // And set the furthest data
                this.furthestFound = {
                    index: this.index,
                    stackItem: top,
                };
            }

            // And return the match information
            return {
                match: match,
                range: {
                    start: this.index - match[0].length,
                    end: this.index,
                },
            };
        } else {
            // Output a message that can be used for debugging, if enabled
            if (this.debug) console.log("Tried", this.index, regex);
        }
    }

    /**
     * Stops attempting to match the definition and the top the stack, and moves onto the next one
     * @returns {undefined}
     */
    nextAttempt() {
        // Get the index
        const stackIndex = this.stack.length - 1;

        // Get the top of the stack
        let top = this.stack[stackIndex];

        // Check if this is an inflation attempt, or a normal child match
        if (top.isInflationAttempt) {
            // Reset the index to the end of that match
            this.index = top.inflationTarget.match.range.end;

            this.stack.pop();
            top = this.stack[stackIndex] = this.createInflateStackItem(
                top.inflationTarget,
                top.attempt + 1
            );
        } else {
            // Reset the index to the start of this match
            this.index = top.match.range.start;

            this.stack.pop();
            top = this.stack[stackIndex] = this.createchildStackItem(
                top.variableMatch,
                top.attempt + 1
            );
        }

        // If no next definition could be found, finish this attempt
        if (!top.definition) this.popStack();
    }

    /**
     * Pops a definition off the stack, either after failing or succeeding to match it
     * @param {boolean} success - Whether or not the stackItem that will be popped successfully matched
     * @returns {undefined}
     */
    popStack(success) {
        let stackItem;

        // Check whether the stack was popped because the top finished successfully
        if (success) {
            // Pop the stackItem
            stackItem = this.stack.pop();

            // Add the end index to the match of the popped item
            stackItem.match.range.end = this.index;

            // Check if we should attempt to inflate the match
            if (stackItem.tryInflate) {
                // If so, add an inflation attempt to the stack
                this.pushStack(this.createInflateStackItem(stackItem, 0));

                // Indicate that no inflation is needed in the future
                stackItem.tryInflate = false;
            } else {
                // Otherwise, get the top of the stack, and add the match as a child
                const top = this.stack[this.stack.length - 1];
                if (top) top.match.parts.push(stackItem);

                // Cache the item for possible future usage
                this.cacheItem(stackItem);
            }
        } else {
            // Pop the stack item
            stackItem = this.stack.pop();

            // Check if the item was an inflation attempt
            if (stackItem.isInflationAttempt) {
                // Get the top of the stack, and add the item we tried to inflate as a part of the match
                // (Even though the inflation failed, we already had a valid match)
                const top = this.stack[this.stack.length - 1];
                if (top) top.match.parts.push(stackItem.inflationTarget);

                // Cache the item for possible future usage
                this.cacheItem(stackItem.inflationTarget);

                // Set success to true, to indicate that the inflation target was at least successful
                success = true;

                // Indicate that the successfull stack item was the target, not the inflation item itself
                stackItem = stackItem.inflationTarget;
            } else {
                // Check if there is anything left on the stack
                if (this.stack.length > 0) {
                    // If it wasn't an inflation attempt, then the top's current definition can't be matched
                    // So move to the next definition
                    this.nextAttempt();

                    // Cache the item for possible future usage
                    this.cacheItem(stackItem);
                }
            }
        }

        // Check if we have popped the whole stack (!finished because recursion could finish it successfully, and finish unsuccessfully aftwards)
        if (this.stack.length == 0 && !this.finished) {
            // If we have, we finished the process
            this.finish(!!success, stackItem);
        }
    }

    /**
     * Pushes a stackItem onto the stack
     * @param {Object} item - The stackItem to push onto the stack
     * @returns {undefined}
     */
    pushStack(item) {
        this.stack.push(item);
    }

    /**
     * Finishes the matching process, either successfulyl or not
     * @param {boolean} success - Whether we finished with a successful match
     * @param {Object} stackItem - The stackItem that was last popped before finishing (the root)
     * @returns {undefined}
     */
    finish(success, stackItem) {
        // Indicate that we finished
        this.finished = true;

        // Indicate whether we finished succesfully, which entails having a succesfull match until the end of the input
        this.finishedSuccesfully =
            success && this.index == this.ast.input.length;

        // Store the result item as the root of the abstract syntax tree
        this.ast.root = stackItem;
    }

    /**
     * Checks the cache for a previous match at the current index with the top variable
     * It automatically pops the top item and applies the match if found
     * @returns {boolean} Whether or not a cached item was found
     */
    checkCache() {
        // Get the top of the stack
        let top = this.stack[this.stack.length - 1];

        // Get the cache at the match's start index
        let cacheAtIndex = this.cache[top.match.range.start];
        if (cacheAtIndex && cacheAtIndex[top.variableMatch.variable]) {
            // If this variable has already been cached at this index, replace the top by it
            top = this.stack[this.stack.length - 1] =
                cacheAtIndex[top.variableMatch.variable];

            // Check if the variable matched successfully previously
            if (top.definition) {
                // Indicate that the index should now be at the end of the match
                this.index = top.match.range.end;

                // Pop the stack with success
                this.popStack(true);
            } else {
                // Reset the index to the start of the match
                this.index = top.match.range.start;

                // Pop the stack without success
                this.popStack();
            }

            // Indicate that an cached item was found and used
            return true;
        }
    }

    /**
     * Stores a stackItem in the cache such that it can be used later if needed
     * @param {Object} stackItem - The stackItem to store in the cache
     * @returns {undefined}
     */
    cacheItem(stackItem) {
        // Create the cache at the index if not present
        let cacheAtIndex = this.cache[stackItem.match.range.start];
        if (!cacheAtIndex)
            cacheAtIndex = this.cache[stackItem.match.range.start] = {};

        // Cache the item for future usage
        cacheAtIndex[stackItem.variableMatch.variable] = stackItem;
    }

    /**
     * Creates a stackItem representing an inflation attempt of another stackItem
     * @param {Object} inflationTarget - The stackItem that we are attempting to inflate
     * @param {number} attempt - The attempt of the inflation (corresponds with the definition index)
     * @returns {Object} The stackItem that was created
     */
    createInflateStackItem(inflationTarget, attempt) {
        // Get the top of the stack
        const top = this.stack[this.stack.length - 1];

        return {
            // The variable that we should match
            variableMatch: inflationTarget.variableMatch,
            // What attempt this is to match this variable
            attempt: attempt,
            // Store the definition that we are trying to match
            definition: this.grammar.getDefinition(
                inflationTarget.variableMatch.variable,
                attempt,
                true
            ),
            // Whether we should try to inflate the result with a left recursive rule
            tryInflate: true,
            // The data on what we matched
            match: {
                parts: [inflationTarget],
                range: {
                    start: inflationTarget.match.range.start,
                },
            },
            // A reference to the parent element that is creating this element
            parent: top && {
                stackItem: top,
                patternIndex: top.match.parts.length,
            },
            // Indicate that this is an inflation attempt
            isInflationAttempt: true,
            // Store the item we are inflating
            inflationTarget: inflationTarget,
        };
    }

    /**
     * Creates a stackItem respresnting a child variable that needs to be matched
     * @param {Object} variableMatch - The variable taht we are trying to match
     * @param {number} attempt - The attempt of the inflation (corresponds with the definition index)
     * @returns {Object} The stackItem that was created
     */
    createchildStackItem(variableMatch, attempt) {
        // Get the top of the stack
        const top = this.stack[this.stack.length - 1];

        // Determine whether this item should try to inflate (in order for left recursion,
        //  the child of an inflation attempt shouldn't inflate if it is the same variable)
        const tryInflate =
            top &&
            top.variableMatch.variable == variableMatch.variable &&
            top.isInflationAttempt
                ? false
                : true;

        return {
            // The variable that we should match
            variableMatch: variableMatch,
            // What attempt this is to match this variable
            attempt: attempt,
            // Store the definition that we are trying to match
            definition: this.grammar.getDefinition(
                variableMatch.variable,
                attempt,
                false
            ),
            // Whether we should try to inflate the result with a left recursive rule
            tryInflate: tryInflate,
            // The data on what we matched
            match: {
                parts: [],
                range: {
                    start: this.index,
                },
            },
            // A reference to the parent element that is creating this element
            parent: top && {
                stackItem: top,
                patternIndex: top.match.parts.length,
            },
        };
    }

    /**
     * Creates an error message based on the furthest index we successfully matched
     * @returns {string} The message representing the error
     */
    getErrorMessage() {
        // Check if a furthestFound was stored
        if (this.furthestFound) {
            // Get the index until where was matched
            const furthestIndex = this.furthestFound.index;

            // Get the character of the input at this index
            const unexpected = this.ast.input[furthestIndex];

            // Create a message
            return (
                "Unexpected symbol `" +
                unexpected +
                "` at index " +
                furthestIndex
            );
        }
    }

    /**
     * Executes multiple steps of the matching process
     * @param {number} maxSteps - The maximum number of steps to execute
     * @returns {(Error|AST)} Either returns an error if the match failed, or the AST created
     */
    stepAll(maxSteps = 100000) {
        // As a safety feature, don't allow infinite loops by using maxSteps
        while (this.stack.length > 0 && maxSteps-- > 0) {
            // Step until the stack is empty
            this.step();
        }

        // Check if we finished succesfully
        if (this.finished) {
            // Check if we finished successfully
            if (this.finishedSuccesfully) {
                // Return the created ast if succesful
                return this.ast;
            } else {
                // Otherwise return an error message
                return new Error(this.getErrorMessage());
            }
        } else {
            // There might have been an infinite recursion or something
            return new Error(
                "Either check your grammar for mistakes or increase the maxSteps"
            );
        }
    }
}
