/**
 * This will only be here temporarily, untill Empirlver V2 is in a better state
 */
export default class CFG {
    /**
     * Creates a context free grammar that can be used by a context free grammar matcher
     * @param {Object} grammar - The grammar to wrap
     * @param {string} startVariable - The variable that should be used as the grammar's start variable
     * @constructs CFG
     */
    constructor(grammar, startVariable) {
        // Store the input variables
        this.inputGrammar = grammar;
        this.startVariable = startVariable;

        // Create a normalized version of the grammar
        this.normalizedGrammar = this.__normalizeGrammar(grammar);

        // Check for indirect left recursion
        const indirectLeftRecursions = this.__checkForIndirectLeftRecursion(
            this.normalizedGrammar
        );
        if (indirectLeftRecursions.length > 0) {
            // Convert the recursion list to a string over multiple lines
            const recursionText = indirectLeftRecursions
                .map(recursion => {
                    // Turn the recursion into a full loop
                    let recursionLoop = recursion.concat(recursion[0]);

                    // Turn the definitions to string
                    recursionLoop = recursionLoop.map(definition =>
                        this.__getDefinitionIdentifier(definition)
                    );

                    // Join the definitions with arrows
                    return recursionLoop.join(" -> ");
                })
                .join("\n");

            // Create and throw an error
            throw new Error(
                "Indirect left recursion detected: \n" + recursionText
            );
        }
    }

    /**
     * Returns a certain definition
     * @param {string} variable - The variable to get a definition for
     * @param {number} index - The index of the definition to get
     * @param {boolean} [leftRecursive=false] - Whether to get a left recursive definition or a normal one
     * @returns {Object} The definition that was found
     */
    getDefinition(variable, index, leftRecursive) {
        return this.normalizedGrammar[variable].definitions[
            leftRecursive ? "leftRecursive" : "normal"
        ][index];
    }

    /**
     * Returns a certain variable
     * @param {number} index - The index of the variable to get
     * @returns {string} The variable that was found
     */
    getVariable(index) {
        return Object.keys(this.normalizedGrammar)[index];
    }

    /**
     * Returns the start variable
     * @return {Object} The start variable
     */
    getStartVariable() {
        return {variable: this.startVariable};
    }

    /**
     * Throws an error of the normalizedGrammar contains indirect left recursion
     * @param {Object} normalizedGrammar - The normalized grammar in which to check for indirect left recursion
     * @returns {String[][]} The list of variable recursion loops, where every loop is a list of definitions
     */
    __checkForIndirectLeftRecursion(normalizedGrammar) {
        // Track what indirect left recursions have been detected
        const recursions = [];

        // Go through all variables
        Object.keys(normalizedGrammar).forEach(variable => {
            // Create a stack of variables to analyze, but store as definition for better feedback
            const stack = [
                {
                    definition: {variable: variable}, // Not a real definition, but we care about the variable
                    childDefinitions: normalizedGrammar[
                        variable
                    ].definitions.normal.slice(0),
                },
            ];

            while (stack.length > 0) {
                // Get the top of the stack
                const top = stack[stack.length - 1];

                // Get the next definition
                const definition = top.childDefinitions.pop();

                // Check if there is still a definition
                if (!definition) {
                    // Pop the item of the stack
                    stack.pop();
                } else {
                    // Check if the definition has a variable at the first location
                    if (
                        definition.pattern[0] &&
                        definition.pattern[0].variable
                    ) {
                        // Get this variable
                        const variable = definition.pattern[0].variable;

                        // Check if the stack doesn't contain the variable
                        const index = stack.findIndex(
                            item => item.definition.variable == variable
                        );
                        if (index == -1) {
                            // Get the variable group
                            const variableGroup = normalizedGrammar[variable];

                            // If this doesn't exist, throw an error
                            if (!variableGroup)
                                throw new Error(
                                    "Undefined variable " +
                                        variable +
                                        " in " +
                                        this.__getDefinitionIdentifier(
                                            definition
                                        )
                                );

                            // If it doesn't, push the variable onto the stack
                            stack.push({
                                definition: definition,
                                childDefinitions: variableGroup.definitions.normal.slice(
                                    0
                                ),
                            });
                        } else {
                            // If it does, add the loop to the output
                            recursions.push(
                                stack
                                    .slice(index + 1)
                                    .map(item => item.definition)
                                    .concat(definition)
                            );
                        }
                    }
                }
            }
        });

        // Return the recursions that were found
        return recursions;
    }

    /**
     * Normalizes the grammar
     * @param {Object} grammar - The grammar to normalize
     * @returns {Object} The normalized copy of the grammar
     */
    __normalizeGrammar(grammar) {
        // Make an object to store the normalize grammar
        const normalizedGrammar = {};

        // Go through all variables in the grammar
        Object.keys(grammar).forEach(variable => {
            // Normalize the variable data, and store it
            normalizedGrammar[variable] = this.__normalizeVariable(
                variable,
                grammar[variable]
            );
        });

        // Return the normalized grammar
        return normalizedGrammar;
    }

    /**
     * Normalizes the variableData of a grammar
     * @param {string} variable - The variable to normalize
     * @param {Object} variableData - The variableData to normalize
     * @returns {Object} The normalized copy of the variableData
     */
    __normalizeVariable(variable, variableData) {
        // The variable definitions
        let definitions;

        // Check whether the variableData is just the list of definitions or not
        if (variableData instanceof Array) {
            // Initialise the definitions and variableData
            definitions = variableData;
            variableData = {};
        } else {
            // Check if there is a single definitions array
            if (variableData.definitions instanceof Array) {
                // Extract the definitions
                definitions = variableData.definitions;
            } else {
                // Combine the left recursive and normal definitions
                definitions = variableData.definitions.leftRecursive.concat(
                    variableData.definitions.normal
                );
            }
        }

        // Store the resulting definitions
        const leftRecursiveDefinitions = [];
        const normalDefinitions = [];

        // Map all the definitions
        definitions.forEach(definition => {
            // Normalize the definition
            const normalizedDefinition = this.__normalizeDefinition(
                variable,
                definition
            );

            // Check if the deinition is left recursive or not
            if (
                normalizedDefinition.pattern[0] &&
                normalizedDefinition.pattern[0].variable == variable
            ) {
                // Add to the left recursive definitions
                leftRecursiveDefinitions.push(normalizedDefinition);
            } else {
                // Add to the normal definitions
                normalDefinitions.push(normalizedDefinition);
            }
        });

        // mak a copy of the variableData, and add the definitions
        const normalizedVariableData = Object.assign({}, variableData, {
            definitions: {
                leftRecursive: leftRecursiveDefinitions,
                normal: normalDefinitions,
            },
        });

        // Return the normalized variableData
        return normalizedVariableData;
    }

    /**
     * Normalizes the definition of a certain variable
     * @param {string} variable - The veriable that the definition is a part of
     * @param {Object} definition - A definition of a variable
     * @returns {Object} The normalized copy of the definition
     */
    __normalizeDefinition(variable, definition) {
        // Copy the definition, and normalize the pattern
        return Object.assign({}, definition, {
            // Assign the variable
            variable: variable,

            // Map the pattern
            pattern: definition.pattern.map(part => {
                if (part instanceof RegExp || part.regex) {
                    return this.__normalizeMatch(part, definition);
                } else if (typeof part == "string" || part instanceof Object) {
                    return this.__normalizeVariableReference(part, definition);
                } else {
                    // If it is of any other type, it should be rejected
                    throw this.__createDefinitionError(
                        definition,
                        "contains an invalid type: " +
                            part +
                            "\nShould be a object, string or regular expression"
                    );
                }
            }),
        });
    }

    /**
     * Normalizes the variable reference for a certain definition
     * @param {(Object|string)} variableReference - The variable reference in some form to normalize
     * @param {Object} definition - The definition that the refernce occures in
     * @returns {Object} The normalized copy of the variable reference
     */
    __normalizeVariableReference(variableReference, definition) {
        // The variable match data
        let normalizedVariableReference = {};

        // Check if the variableReference is already a variable match, or just the variable
        if (typeof variableReference == "string") {
            // The variableReference is purely the variable, so assign the variable
            normalizedVariableReference.variable = variableReference;
        } else {
            // The variableReference is the normalizedVariableReference, so overwrite it
            normalizedVariableReference = variableReference;

            // Make sure the normalizedVariableReference has a variable
            if (!variableReference.variable)
                throw this.__createDefinitionError(
                    definition,
                    "contains an invalid variable: " +
                        JSON.stringify(normalizedVariableReference) +
                        "\nPlease assign the object a variable"
                );
        }

        // Return the variableReference
        return normalizedVariableReference;
    }

    /**
     * Normalizes the match for a certain definition
     * @param {(Object|RegExp)} match - The item to match in any form
     * @param {Object} definition - The definition that the refernce occures in
     * @returns {Object} The normalized copy of the match
     */
    __normalizeMatch(match, definition) {
        // The variable match data
        let normalizedMatch = {};

        // Check if the match is already a real match, or just the regular expression
        if (match instanceof RegExp) {
            // The match is purely the regex, so assign it to the normalized match
            normalizedMatch.regex = match;
        } else {
            // The match is the actual match, so overwrite the normalizedMatch with it
            normalizedMatch = match;
        }

        // Make sure the regex doesn't contain a sticky modifier, but has a global modifier
        normalizedMatch.regex = this.__removeRegexFlag(
            this.__addRegexFlag(normalizedMatch.regex, "g"),
            "y"
        );

        // Make a copy of the regex with a sticky modifier
        normalizedMatch.stickyRegex = this.__addRegexFlag(
            normalizedMatch.regex,
            "y"
        );

        // Return the normalized match
        return normalizedMatch;
    }

    /**
     * Creates an error message indicating where the error occured
     * @param {Object} definition - The definition in which the error occured
     * @param {string} error - The error message body
     * @return {Error} The created error
     */
    __createDefinitionError(definition, error) {
        return Error(this.__getDefinitionIdentifier(definition) + " " + error);
    }

    /**
     * Creats a textual identifier for a definition
     * @param {Object} definition - The definition to create an identifier for
     * @returns {string} The textual identifier
     */
    __getDefinitionIdentifier(definition) {
        return definition.variable + "#" + definition.name;
    }

    /**
     * Adds the specified flag to a regular expression if not present
     * @param {RegExp} regex - The regular expression to add the flag to
     * @param {string} flags - The flag(s) to add to the expression
     * @returns {RegExp} The resulting regular expression, with the flag
     */
    __addRegexFlag(regex, flags) {
        const match = regex
            .toString()
            .match(
                new RegExp("\\/(.*)\\/([^" + flags + "]*)" + flags + "?(.*)")
            );
        return new RegExp(match[1], match[2] + match[3] + flags);
    }

    /**
     * Removes the specified flag from a regular expression if present
     * @param {RegExp} regex - The regular expression to remove the flag from
     * @param {string} flags - The flag(s) to remove from the expression
     * @returns {RegExp} The resulting regular expression, without the flag
     */
    __removeRegexFlag(regex, flags) {
        const match = regex
            .toString()
            .match(
                new RegExp("\\/(.*)\\/([^" + flags + "]*)" + flags + "?(.*)")
            );
        return new RegExp(match[1], match[2] + match[3]);
    }
}
