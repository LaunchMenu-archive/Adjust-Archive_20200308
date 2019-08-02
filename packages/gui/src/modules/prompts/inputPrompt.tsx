import {Box, TextField, FormControl, FormHelperText, Typography} from "@material-ui/core";
import {createModuleView, React} from "@adjust/core";
import {KeyboardEvent} from "react";
import {InputPromptID, InputPrompt, PromptData} from "./inputPrompt.type";
import {createModule} from "../../module/moduleClassCreator";

export const config = {
    initialState: {
        type: "string",
        title: "",
        description: "",
        placeHolder: "",
        errorMessage: "",
        value: undefined as any,
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
    type: InputPromptID,
};

export default class InputPromptModule extends createModule(config)
    implements InputPrompt {
    // A method to resolve a prompt command
    protected callback: (value: any) => void;

    // All the value constraints that currently aplly
    protected constraints: {
        minLength?: number;
        maxLength?: number;
        pattern?: RegExp;
        minValue?: number;
        maxValue?: number;
    };

    /** @override */
    public async prompt(
        type: string,
        data: PromptData & {
            defaultValue: any;
            minLength?: number;
            maxLength?: number;
            pattern?: RegExp;
            minValue?: number;
            maxValue?: number;
        }
    ): Promise<any | undefined> {
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
        } else if (type == "number") {
            this.constraints = {
                minValue: data.minValue,
                maxValue: data.maxValue,
            };
        } else {
            this.constraints = {};
        }

        // A promise to return a value when the user has selected one
        return new Promise(resolve => (this.callback = resolve));
    }

    /**
     * Resolves any open standing prompt
     * @param value The value to resolve the prompt with, uses value from state if absent
     */
    public resolve(value?: any): void {
        // Obtain the value if required
        if (value === undefined) value = this.state.value;

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
    public setValue(value: any): void {
        // Format the value
        if (this.state.type == "number") value = Number(value);

        // Set the value
        this.setState({value});

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
    public async onClose(): Promise<void> {
        this.resolve(undefined);
    }
}

export class InputPromptView extends createModuleView(InputPromptModule) {
    /**
     * Handles keyboard events
     * @param event The keyboard event
     */
    protected keyEvent(event: KeyboardEvent<HTMLDivElement>): void {
        event.stopPropagation();
        event.nativeEvent.stopImmediatePropagation();
        if (event.key === "Enter") {
            this.module.resolve();
        }
    }

    /**@override */
    protected renderView(): JSX.Element {
        return (
            <Box p={2}>
                {this.state.title && (
                    <Box className="title">
                        <Typography variant="h5" component="h2">
                            {this.state.title}
                        </Typography>
                    </Box>
                )}
                {this.state.description && (
                    <Box className="description">
                        <Typography variant="body2" component="p">
                            {this.state.description}
                        </Typography>
                    </Box>
                )}
                <FormControl className={"input"} fullWidth>
                    <TextField
                        className={"inputField"}
                        margin="normal"
                        aria-describedby="inputError"
                        placeholder={this.state.placeHolder}
                        error={!!this.state.errorMessage}
                        value={this.state.value}
                        onChange={e => this.module.setValue(e.target.value)}
                        onKeyPress={e => this.keyEvent(e)}
                        type={this.state.type == "number" ? "number" : "text"}
                        fullWidth
                    />
                    {this.state.errorMessage && (
                        <FormHelperText id="inputError">
                            {this.state.errorMessage}
                        </FormHelperText>
                    )}
                </FormControl>
            </Box>
        );
    }
}
