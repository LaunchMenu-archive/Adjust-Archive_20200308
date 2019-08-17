Object.defineProperty(exports, "__esModule", { value: true });
const core_1 = require("@adjust/core");
const inputPrompt_type_1 = require("./inputPrompt.type");
const moduleClassCreator_1 = require("../../module/moduleClassCreator");
const Box_1 = require("../../components/Box");
const lib_commonjs_1 = require("office-ui-fabric-react/lib-commonjs");
exports.config = {
    initialState: {
        type: "string",
        title: "",
        description: "",
        placeHolder: "",
        errorMessage: "",
        value: undefined,
    },
    settings: {},
    defineLocation: {
        ID: "prompt",
        hints: {
            window: {
                new: true,
                windowName: "Prompt",
                width: 400,
                height: 250,
            },
        },
    },
    type: inputPrompt_type_1.InputPromptType,
};
class InputPromptModule extends moduleClassCreator_1.createModule(exports.config) {
    /** @override */
    async prompt(type, data) {
        // Resolve any previous prompt
        this.resolve(null);
        // Set the state variables
        this.setState({
            type,
            title: data.title,
            description: data.description,
            placeHolder: data.placeHolder,
            value: data.defaultValue,
            errorMessage: "",
        });
        // Set any constraints
        if (type == "string") {
            this.constraints = {
                minLength: data.minLength,
                maxLength: data.maxLength,
                pattern: data.pattern,
            };
        }
        else if (type == "number") {
            this.constraints = {
                minValue: data.minValue,
                maxValue: data.maxValue,
            };
        }
        else {
            this.constraints = {};
        }
        // Make sure this GUI is visible
        await this.show();
        // A promise to return a value when the user has selected one
        return new Promise(resolve => (this.callback = resolve));
    }
    /**
     * Resolves any open standing prompt
     * @param value The value to resolve the prompt with, uses value from state if absent
     */
    resolve(value) {
        // Obtain the value if required
        if (value === undefined)
            value = this.state.value;
        // Return the value if applicable
        if (this.callback && (value == null || !this.state.errorMessage)) {
            this.callback(value);
            this.callback = undefined;
        }
    }
    /**
     * Sets the input value
     * @param value The value that is currently chosen
     */
    setValue(value) {
        // Format the value
        if (this.state.type == "number")
            value = Number(value);
        // Set the value
        this.setState({ value });
        // Check constraints and set applicable error
        const c = this.constraints;
        if (c.minLength != null && this.state.value.length < c.minLength)
            this.setState({
                errorMessage: `Value should have at least length ${c.minLength}`,
            });
        else if (c.maxLength != null && this.state.value.length > c.maxLength)
            this.setState({
                errorMessage: `Value should have at most length ${c.maxLength}`,
            });
        else if (c.pattern != null && c.pattern.test(this.state.value))
            this.setState({
                errorMessage: `Value is not allowed`,
            });
        else if (c.minValue != null && this.state.value > c.minValue)
            this.setState({
                errorMessage: `Value should be at least ${c.minValue}`,
            });
        else if (c.maxValue != null && this.state.value < c.maxValue)
            this.setState({
                errorMessage: `Value should be at most ${c.maxValue}`,
            });
        else
            this.setState({
                errorMessage: "",
            });
    }
    /** @override */
    async onClose() {
        this.resolve(undefined);
    }
}
exports.default = InputPromptModule;
class InputPromptView extends core_1.createModuleView(InputPromptModule) {
    /**
     * Handles keyboard events
     * @param event The keyboard event
     */
    keyEvent(event) {
        event.stopPropagation();
        event.nativeEvent.stopImmediatePropagation();
        if (event.key === "Enter") {
            this.module.resolve();
        }
    }
    /**@override */
    renderView() {
        return (core_1.React.createElement(Box_1.Box, { padding: "l" },
            this.state.title && core_1.React.createElement(Box_1.Box, { className: "title" }, this.state.title),
            this.state.description && (core_1.React.createElement(Box_1.Box, { className: "description" }, this.state.description)),
            core_1.React.createElement(lib_commonjs_1.TextField, { className: "inputField", borderless: true, placeholder: this.state.placeHolder, errorMessage: this.state.errorMessage, onChange: (e, value) => this.module.setValue(value), onKeyUp: e => this.keyEvent(e) })));
    }
}
exports.InputPromptView = InputPromptView;
//# sourceMappingURL=inputPrompt.js.map