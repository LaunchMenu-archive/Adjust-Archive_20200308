import {createModuleView, React} from "@adjust/core";
import {KeyboardEvent} from "react";
import {TextField} from "office-ui-fabric-react";
import {InputPromptType, InputPrompt, PromptData} from "./inputPrompt.type";
import {createModule} from "../../module/moduleClassCreator";
import {Box} from "../../components/Box";

export const config = {
    state: {
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
                name: "Prompt",
                width: 400,
                height: 250,
            },
        },
    },
    type: InputPromptType,
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
        this.changeState({
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

        // Make sure this GUI is visible
        await this.show();

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
        this.changeState({value});

        // Check constraints and set applicable error
        const c = this.constraints;
        if (c.minLength != null && this.state.value.length < c.minLength)
            this.changeState({
                errorMessage: `Value should have at least length ${c.minLength}`,
            });
        else if (c.maxLength != null && this.state.value.length > c.maxLength)
            this.changeState({
                errorMessage: `Value should have at most length ${c.maxLength}`,
            });
        else if (c.pattern != null && c.pattern.test(this.state.value))
            this.changeState({
                errorMessage: `Value is not allowed`,
            });
        else if (c.minValue != null && this.state.value > c.minValue)
            this.changeState({
                errorMessage: `Value should be at least ${c.minValue}`,
            });
        else if (c.maxValue != null && this.state.value < c.maxValue)
            this.changeState({
                errorMessage: `Value should be at most ${c.maxValue}`,
            });
        else
            this.changeState({
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
    protected keyEvent(event: KeyboardEvent<HTMLElement>): void {
        event.stopPropagation();
        event.nativeEvent.stopImmediatePropagation();
        if (event.key === "Enter") {
            this.module.resolve();
        }
    }

    /**@override */
    protected renderView(): JSX.Element {
        return (
            <Box padding="l">
                {this.state.title && <Box className="title">{this.state.title}</Box>}
                {this.state.description && (
                    <Box className="description">{this.state.description}</Box>
                )}
                {/* TODO: use type to only allow numbers if type is set to number */}
                <TextField
                    className={"inputField"}
                    borderless
                    placeholder={this.state.placeHolder}
                    errorMessage={this.state.errorMessage}
                    onChange={(e, value) => this.module.setValue(value)}
                    onKeyUp={e => this.keyEvent(e)}
                />
            </Box>
        );
    }
}
