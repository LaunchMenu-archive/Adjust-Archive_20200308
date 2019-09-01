# Adjust <!-- omit in toc -->

This is a mono repository for the Adjust Framework. No official version of this framework has been released yet, since main features are still being made.

## Index <!-- omit in toc -->

- [Core functionality/principles](#core-functionalityprinciples)
  - [Dependency Inversion Principle](#dependency-inversion-principle)
  - [Settings](#settings)
  - [MVC](#mvc)
- [GUI package](#gui-package)
  - [Settings Manager](#settings-manager)
  - [Location Manager](#location-manager)
  - [Theme manager](#theme-manager)
- [Code example overview](#code-example-overview)
- [Typescript](#typescript)
- [Current state](#current-state)

## Core functionality/principles

Adjust is an application framework primarily making use of electron, typescript and react to allow for making powerful, well organized applications using mainstream web technologies.
Adjust's primary goal is to provide a framework that can be used to make highly adjustable applications, adjustable by both developers and users.

### Dependency Inversion Principle

One of the main problems Adjust solves is the tight coupling between modules that easily arises in any application. The approach Adjust takes to solve this, is to essentially use factory methods for nearly all objects. This system consists of 3 parts/steps:

-   Create a contract (essentially an interface) for a module
-   Create a module that implements the contract
-   Within some other module, request an module that adheres to this contract from the registry

The 'Registry' is the part of Adjust that keeps track of all contracts and modules. In order to do this, an Adjust application will first scan the code directories for all modules to load them into the registry, and only then start the application. In the future there will also be support for storing this data to improve load times.

The huge benefit of this decoupling of modules is that any additional (possibly 3rd party) packages can be installed, to replace existing modules to the user's liking. Essentially any part of your applications will be replacable using plugins, without you having to worry about creating an API for this.

Another benefit is that if your application provides multiple ways of doing something, Adjust can easily prompt the user to ask their preference (just like how OSes prompt about what application to open a file with).

Below is an example of the 3 parts/steps for module communication

<details>
<summary>The contract, written in typescript: MyService.type.ts</summary>

```ts
import { Registry } from "@adjust/core";
import { ChildModule, ParentModule } from "@adjust/core/types";

export type MyService = ChildModule<{
    /**
     * This will do something
     * @param info Info on what to do
     * @returns A promise with some result,
     *      must always be a promise to keep implementations open ended
     *      (Implementation might want to use user interaction)
     */
    doSomething(info: string): Promise<void>;
}>;
export type MyServiceParent = ParentModule<{
    /**
     * Some callback that we expect to exist on the module that created an instance of MyService
     * This alows for returning of data to the parent at any time if required
     * This is prefered over callback passing as arguments, for future expandability
     * @param someData The data that we want the parent to receive
     */
    someCallback(someData: number): Promise<void>;
}>;
export type MyServiceContract = {
    parent: MyServiceParent;
    child: MyService;
    /**
     * Any data that we want our module to receive upon instanciation
     */
    data: {
        /**
         * The name of our MyService instance
         */
        name: string;
    };
};

// Export the contract as a "Type", which is essentially a runtime identifier for the contract
// (Module types shouldn't be confused with typescript types)
export const MyServiceType = Registry.createContractID<MyServiceContract>(
    // The location of the file, serving as a unique identifier
    __filename,
    // Any data about the contract, which can be displayed to the user
    {
        name: "MyService",
        description: "Example contract"
    }
);
```

</details>

<details>
<summary>An implementation of the contract: MyService.ts</summary>

```ts
import { createConfig, createModule } from "@adjust/core";
import { MyServiceType, MyService } from "./MyService.type";

// Declare a configuration for your module (Any possibly export it for extendability purposes)
export const myServiceConfig = createConfig({
    // Some data about the module, which can be displayed to the user
    details: {
        name: "MyService",
        description: "Example module"
    },
    // Declares a state and its initial values, very similar to a react state
    state: {
        info: ""
    },
    // Declares settings, which will be described in detail in another section
    settings: {},
    // Declares what interface this module implements, such that the Registry can read it
    type: MyServiceType
});

// Create the actual implementation itself
export class MyServiceModule extends createModule(myServiceConfig)
    implements MyService {
    /** @override */
    public async onInit(fromReload: false): Promise<void> {
        // This method is called on new instances when they are created
        // Here we can do any processing that has to happen
        //     before the parent calls methods on this instance
        // fromReload is present for have future quick module reloads during development,
        //     in which case a module's previous state is retained

        if (!fromReload)
            // Essentially react's setState, except that it performs a deep merge
            //     and changes are made synchronously
            this.changeState({
                // We can use getData to retrieve the data passed with the request
                info: this.getData().name + " is my name"
            });
    }

    /** @override */
    public async doSomething(info: string): Promise<void> {
        this.changeState({
            info
        });

        // Invoke some method on the parent, using the current state
        this.getParent().someCallback(this.state.info.length);
    }
}

// Export the module as a default, so the registry can read it
//     (named exports are better for bundling though, which is why this example includes both)
export default MyServiceModule;
```

<details>
<summary>We may omit some TS declarations, but it's prefered to keep them</summary>

```ts
export class MyServiceModule extends createModule(myServiceConfig) {
    async onInit() {
        // etc
    }

    async doSomething(info) {
        // etc
    }
}
```

</details>
</details>

<details>
<summary>Another module using our contract: SomeModule.ts</summary>

```ts
import {createConfig, createModule} from "@adjust/core";
import {MyServiceType, MyService} from "./MyService.type";
// Just pretend this type exists
import {SomeModuleType, SomeModule} from "./SomeModule.type";

export const someModuleConfig = createConfig({
    // Use typescript's 'as' to specify what type of variables we are dealing with
    state: {
        dependency: null as MyService
        number: 0,
    },
    settings: {},
    type: SomeModuleType,
});

export class SomeModuleModule extends createModule(someModuleConfig) implements SomeModule {
    /** @override */
    public async onInit(fromReload: false): Promise<void> {
        if (!fromReload) {
            // Indirectly use the registry to get a module that implements the contract
            // This request can also prompt the user to choose a specific module if there are options
            const dependency = await this.request({
                type: MyServiceType,
                data: {
                    name: "John",
                }
            });

            // Store the instance for later usage
            this.changeState({
                dependency: dependency
            });

            // Use the dependency
            await dependency.doSomething("some info");
        }
    }

    // Implement our half of the contract
    /** @override */
    public async someCallback(someData: number): Promise<void> {
        // Now we can do whatever we want with this data
        this.changeState({
            number: someData
        });
    }
}
export default SomeModuleModule;
```

</details>

A simple compiletime dependency graph of these modules can look like this:
![myServiceDependencies](resources/readme/myServiceDependency.png)

A realistic example of what such a module could be, is for instance a color picker. But essentially anything that could be seen as providing it's own service, can be a module. Even something as small as just a field displaying a date, since people might want to format dates differently.
At the same time, not everything needs to be it's own module, you can still create classes that are not modules, if you need more performance for some task, apps will have to balance this themselves. It's mostly recommended to use modules as much as possible, if it involves GUI.

### Settings

Modules come equipt with a simple, yet extremely powerful system to manage settings. In order to use this system, you only have to declare the settings in your config and can directly use them in your module.
The Adjust GUI package will come with components to display all the settings in your app, and allow users to change them, such that you don't have to worry about it. Users will be able to change settings for all instances of your module, but also create settings groups that only apply to certain instances. These groups will contain conditions, that can for instance be based on the module's request data, or current state.

<details>
<summary>A simple example of some settings: MyService.ts</summary>

```ts
import {
    createConfig,
    createSetting,
    createModule,
    SettingStringType,
    SettingNumberType
} from "@adjust/core";
import { MyServiceType, MyService } from "./MyService.type";

export const myServiceConfig = createConfig({
    state: {
        info: ""
    },
    settings: {
        defaultInfo: createSetting({
            default: " is my name",
            type: SettingStringType
        }),
        someCategory: {
            someSetting: createSetting({
                default: 3,
                type: SettingNumberType
            })
        }
    },
    type: MyServiceType
});

// Create the actual implementation itself
export class MyServiceModule extends createModule(myServiceConfig)
    implements MyService {
    /** @override */
    public async onInit(fromReload: false): Promise<void> {
        if (!fromReload)
            this.changeState({
                // Read our setting data
                info: this.getData().name + this.settings.defaultInfo
            });
    }

    /** @override */
    public async doSomething(info: string): Promise<void> {
        this.changeState({
            info
        });

        // Use our setting data (for whatever reason)
        this.getParent().someCallback(
            this.state.info.length + this.settings.someCategory.someSetting
        );
    }
}

export default MyServiceModule;
```

</details>

### MVC

Adjust makes heavily use of the Model-View-Controller paradigm, or potentially MV\* since the model and controller are essentially combined into our 'Module' class. To create a GUI element, we can simply create a 'view class' which extends the React Component class, and attach it to our module.

Our module will only be instanciated into the main node process of our application, but their view classes can be instanciated in any window of the application. You can even create multiple view instances for the same module if you so please.

Within these views, we can make use of any of the request, state or settings data to represent the module. And we can call any of the module's public methods (through [IPC](https://electronjs.org/docs/api/ipc-main)) to interact with the module.
Any references to other modules within the state, will be translated to views of these modules in our view class. Such that we can directly render our dependencies as a part of our GUI.

<details>
<summary>A simple example of a module with a view: SomeModule.tsx</summary>

```tsx
import {createConfig, createModule, createModuleView, WindowManager} from "@adjust/core";
import {MyServiceType, MyService} from "./MyService.type";
// Just pretend this type exists
import {SomeModuleType, SomeModule} from "./SomeModule.type";

export const someModuleConfig = createConfig({
    // Use typescript's 'as' to specify what type of variables we are dealing with
    state: {
        dependency: null as MyService
        number: 0,
        // Add some data for our view's input
        info: "",
    },
    settings: {},
    type: SomeModuleType,
});

export class SomeModuleModule extends createModule(someModuleConfig) implements SomeModule {
    // The window to show this module in
    protected window: {ID: string, window: Promise<Electron.BrowserWindow>};

    /** @override */
    public async onInit(fromReload: false): Promise<void> {
        if (!fromReload) {
            const dependency = await this.request({
                type: MyServiceType,
                data: { name: "John" }
            });
            this.changeState({ dependency });
        }

        // Now in order to actually show a view for this module,
        //     we will have to create a window to show it in
        const windowID = Math.round(Math.random()*Math.pow(10, 10)) + ""; // Make sure this is unique
        const window = await WindowManager.openWindow(windowID, this.getID());
        window.on("close", ()=>{
            WindowManager.closeWindow(windowID);
        });

        // Possibly store the window for later usage
        this.window = {
            ID: windowID,
            window,
        });
    }

    /** @override */
    public async someCallback(someData: number): Promise<void> {
        this.changeState({
            number: someData
        });
    }

    // Add some methods for our view to call
    /**
     * Changes the info of our dependency
     * @param info The new info
     */
    public async changeInfo(info: string): Promise<void> {
        this.changeState({
            info
        });
        this.state.dependency.doSomething(info);
    }
}
export default SomeModuleModule;

// Create a view for our class
export class SomeModuleView extends createModuleView(SomeModuleModule) {
    /** @override */
    protected renderView(): JSX.Element {
        return (<div>
            <input
                value={this.state.info}
                onChange={(e)=>this.module.changeInfo(e.target.value)}/>

            Let's render "number", because why not?
            {this.state.number}

            And render our dependency, assuming it has a view itself:
            {this.state.dependency}
        </div>);
    }
}

// Simply exporting the view is enough, it will be attached by the registry.
// But we may also attach it ourselves using SomeModuleModule.setViewClass(SomeModuleView)
```

</details>

Allowing for using functional components and react hooks is also on the todolist, but this might be challenging without compromissing extendability.

## GUI package

The Adjust GUI package extends the Adjust Core package, and provides standard common modules and views. The reason for the separation between Adjust GUI and Adjust Core is that Adjust GUI pushes a certain style on your application when you use it (which is hard to prevent), but takes a lot of load off your shoulders.

Adjust GUI uses [Microsoft's fabric library](https://github.com/OfficeDev/office-ui-fabric-react) for many of it's components and encourages users of Adjust GUI to stick with this as well for consistency. We might provide packages in the future where views are replaced to use components with other styles from other libraries, but this won't be done in the near future if at all. One could still use Adjust GUI however, and simply do this theirselves.

All of the services that Adjust/GUI provides, have been created using Adjust Modules, and can thus easily be costumised if desired.

### Settings Manager

Adjust GUI comes with a 'SettingsManager' module that can be requested. With this module, you can open a settings menu, and highlight/goto a specific setting you specifiy.
This GUI will allow users to change the settings of all modules in the application, such that you don't have to take care of this yourself.

### Location Manager

Adjust GUI will also come with a "LocationsManager" which will add am elaborate system for displaying modules to the user. With this, a module can simply specify (and or create) a location that its GUI should be shown at.
This means that modules will not have to fiddle with managing windows themselves. It will also allow users to customize their GUI themselves, since locations will be stored in the settings.

<details>
<summary>A simple example of how a module would declare its location</summary>

```ts
export const someModuleConfig = createConfig({
    state: {},
    settings: {},
    // Define a location with an ID,
    //  and give hints on how it should initially appear
    defineLocation: {
        ID: "myLocation",
        hints: {
            window: {
                new: true,
                name: "MyWindow"
            },
            tab: {
                new: true,
                ID: "MyTab"
            }
        }
    },
    type: SomeModuleType
});
```

When we want another module to appear in an already existing location, we can simply pass that location ID as well. If multiple modules share one location, it will simply show the module that last requested focus in this module.

```ts
export const someModuleConfig = createConfig({
    state: {},
    settings: {},
    location: "myLocation",
    type: SomeModuleType
});
```

</details>

<details>
<summary>A simple example of how to indicate that you want a requested module's GUI to be rendered in its specified view</summary>

```ts
await this.request({
    type: SomeModuleType,
    openView: true,
}),
```

We would not want to pass `openView: true` if we are planning on embedding the module's GUI in our own GUI.

</details>

The default locations will be build up of 3 levels (but additional modules can be added to add levels):

-   Window manager, which allows for multiple windows
-   Section manager, which allows for multiple resizeable sections in each window
-   Tab maanger, which allows for multiple tabs in each section

With these 3 levels for each location, you essentially end up with a system similar to programs like photoshop, where you can customize the layout of the whole program.

### Theme manager

Lastly, Adjust GUI provides a "ThemeManager" this Theme Manager makes use of react contexts to provide the whole application with a single coherent theme. This theme can be altered by the user in the settings, if they prefer different colors, fonts, etc. And it's even possible to override the theme for a specific module and its descendants within the settings.
In addition, it will allow the user to specify css styling for any module within the settings, such that users can do little tweaks if required.

Mostly seperate from the theming, but related to it, Adjust GUI injects [emotion](https://github.com/emotion-js/emotion) into react. Such that when react is directly import from Adjust GUI, emotion's css prop can be used.

Modules will be able to use the theme in several ways:

<details>
    <summary>A Box element</summary>

```tsx
import { createModuleView } from "@adjust/GUI";

//...

export class SomeModuleView extends createModuleView(SomeModuleModule) {
    /** @override */

    protected renderView(): JSX.Element {
        return (
            <Box background="primary" margin="l">
                Some content
            </Box>
        );
    }
}
```

The box element can take a large number of standard attributes, to apply the theme to.
It will simply render as a div, with the attributes obtained from the theme and applied as css.

</details>

<details>
<summary>A theme hook</summary>

```tsx
import { createModuleView, useTheme } from "@adjust/GUI";

//...

const SomeReusableComponent: FunctionComponent = ({ children }) => {
    const theme = useTheme();
    return (
        <div
            style={{
                backgroundColor: theme.getColor("primary"),
                margin: theme.getSpacing("l")
            }}
        >
            {children}
        </div>
    );
};

export class SomeModuleView extends createModuleView(SomeModuleModule) {
    /** @override */

    protected renderView(): JSX.Element {
        return <SomeReusableComponent>Some content</SomeReusableComponent>;
    }
}
```

</details>

<details>
<summary>Emotion's callback</summary>

```tsx
import { createModuleView } from "@adjust/GUI";

//...

export class SomeModuleView extends createModuleView(SomeModuleModule) {
    /** @override */
    protected renderView(): JSX.Element {
        return (
            <div
                css={theme => ({
                    backgroundColor: theme.getColor("primary"),
                    margin: theme.getSpacing("l")
                })}
            >
                Some content
            </div>
        );
    }
}
```

</details>

## Code example overview

Comments on all components have been left out to reduce the size in order to provide a better overview

<details>
<summary>A contract, written in typescript: Type2.type.ts</summary>

```ts
import { Registry } from "@adjust/core";
import { ChildModule, ParentModule } from "@adjust/core/types";

export type Type2 = ChildModule<{
    doSomething(info: string): Promise<void>;
}>;
export type Type2Parent = ParentModule<{
    someCallback(someData: number): Promise<void>;
}>;
export type Type2Contract = {
    parent: Type2Parent;
    child: Type2;
    data: {
        name: string;
    };
};

export const Type2Type = Registry.createContractID<Type2Contract>(__filename, {
    name: "Type2",
    description: "Example contract"
});
```

</details>

<details>
<summary>An implementation of the contract: Module2.ts</summary>

```tsx
import {
    createConfig,
    createSetting,
    createModule,
    createModuleView,
    Box
} from "@adjust/core";
import { Type2Type, Type2 } from "./Type2.type";

export const module2Config = createConfig({
    details: { name: "Module2", description: "Example module" },
    state: {
        info: ""
    },
    settings: {
        defaultInfo: createSetting({
            default: " is my name",
            type: SettingStringType
        })
    },
    type: Type2Type
});

export class Module2 extends createModule(module2Config) implements Type2 {
    public async onInit(fromReload: false): Promise<void> {
        if (!fromReload)
            this.changeState({
                info: this.getData().name + this.settings.defaultInfo
            });
    }

    public async doSomething(info: string): Promise<void> {
        this.changeState({ info });
        this.getParent().someCallback(this.state.info.length);
    }
}
export default Module2;

export class Module2View extends createModuleView(Module2) {
    protected renderView(): JSX.Element {
        return (
            <Box color="primary" onClick={() => this.module.doSomething()}>
                {this.state.info}
            </Box>
        );
    }
}
```

</details>

<details>
<summary>Another module using our contract: Module1.ts</summary>

```tsx
import {createConfig, createModule, createModule, createModuleView, Box} from "@adjust/core";
import {Type2Type, Type2} from "./Type2.type";
// Just pretend this type exists
import {Type1Type, Type1} from "./Type1.type";

export const module1Config = createConfig({
    state: {
        dependency: null as MyService
        number: 0,
    },
    settings: {},
    defineLocation: {
        ID: "myLocation",
        hints:{ window:{ new: true, name: "MyWindow" }},
    },
    type: Type1Type,
});

export class Module1 extends createModule(module1Config) implements Type1 {
    public async onInit(fromReload: false): Promise<void> {
        if (!fromReload) {
            const dependency = await this.request({
                type: MyServiceType,
                data: { name: "John" }
            });
            this.changeState({ dependency });
            await dependency.doSomething("some info");
        }
    }

    public async someCallback(someData: number): Promise<void> {
        this.changeState({ number: someData });
    }
}
export default Module1;

export class Module1View extends createModuleView(Module1) {
    protected renderView(): JSX.Element {
        return (
            <Box backgroundColor="neutralPrimary">
                {this.state.number} {this.state.dependency}
            </Box>
        );
    }
}
```

</details>

In general, the dependencies within 2 modules and their relation can be represented with the following diagram:
![Adjust dependency](resources/readme/adjustDependencies.png)

## Typescript

Adjust heavily makes use of typescript. It uses advanced typescript features in order to give powerful intellisense.
Using this intellisense, you can easily spot small mistakes, and nicely refactor code.
The error messages themselves can be confusing however, which will hopefully be improved in the future.

Adjust extracts the type of your state, settings and contract from your config. It then uses this data in the createModule method, such that you can use intellisense both when using and changing the state and settings.

Similarly it passes this data, as well as the module's methods to your view when calling createModuleView. Such that you always know what data can be used for rendering and what callbacks can be made.

Adjust tried (and in my opinion succeeded) to provide this powerfull intellisense, without too much declarative typescript overhead. Most of the actual typescript declarations will be done when defining the contract, but here it also serves as a way to clearly specify intent. This makes it such that other developers can easily use your contracts, or create a module for it.

Here are a couple of examples of typescript detecting errors:

<details>
<summary>incorrect setting type</summary>

![incorrect setting type](/resources/readme/incorrectSettingType.png)

</details>

<details>
<summary>incorrect state type</summary>

![incorrect state type](/resources/readme/incorrectStateType.png)

</details>

<details>
<summary>module state in view</summary>

![module state in view](/resources/readme/moduleState.png)

</details>

<details>
<summary>incorrect module method</summary>

![incorrect module method](/resources/readme/incorrectModuleMethod.png)

</details>

## Current state

Most of Adjust Core is functional, a lot on Adjust GUI is still left however.
For Adjust GUI, the settings menu still has to be created and the location manager's section manager still has to be created.

The test project in the packages can be ran, but is quite a mess (since it's only intended for testing).

The documentation website is also being worked on, and demo projects as well as an installer will have to be made after setting GUI is usable.
