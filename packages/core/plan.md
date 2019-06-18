#Registry
-   Stores module classes and modules that can answer requests
-   Modules are retrieved async and might require user prompts

-   Priorities based on some settings:

    -   User defined
    -   Defaults to later installation date -> higher priority
    -   Modules can define specific modules to which they should always have higher priority

#Modules
-   Store list of all instanciated modules in main process
-   Modules have a serializable state:

    -   Upon init, a method should be called on the module for proper deserialization
    -   Serialize can be overriden in order to store extra data (which really shouldn't be needed), or remove data that can be obtained from other serialized data
    -   Whole application can be serialized and deserialized

-   Modules can not close them selves:

    -   Modules are only closed, once all parents disconnected from them
    -   Modules can request their parent module to disconnect from them

-   Modules have settings files:

    -   Settings can be applied with specific conditions, and conditions are based on module state
    -   Modules get values for these settings assigned based on their state, these will update dynamically as the state changes

-   Shortcuts:

    -   Captured from document root, inputs have higher priority and may dispatch events as shortcuts themselves
    -   General keyboard listeners are specified in the config, and automatically added to settings
    -   Bubble up the module parents in a breadth first fassion (a module can have multiple parents),
        and whenever reaching a parent go down its children using breadth first search

    -   Non blocking top priority listeners can be manually registered

-   Mnemonics:

    -   A module specifies mnemonics for all selectable children, specified through the request
    -   Go through the mnemonics by going through the module hierachy
    -   Provide a 'activateMnemonics' method to show the mnemonics in the GUI, and allow for the events to be used

#GUI
-   Gui for a module can be created multiple times
-   Gui can't interact with other modules
-   Gui can only read the module state, and call module methods on user input
-   Gui can be closed and moved without impacting functionality (as a result of the structure)
-   Modules store in which locations they have GUI opened:

    -   This allows for only sending updates to windows when needed
    -   This also allows for creating GUI when really necessary for it to do anything
