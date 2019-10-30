-   Module able to request other module directly:

    -   Store retrieved module in state

-   [x] Add instanceModuleProvider

-   GUI module system:

    -   Add tests for GUI system
        -   Add test to remoteModuleProxy
        -   Add tests for all other GUI related stuff
    -   [x] viewManager that stores and keeps track of view instances
    -   Modules to manage the views GUI:
        -   Window manager to manage the different windows
        -   Window to have the window's GUI and sections
        -   Sections to manage different sections with tabs
        -   Tabs to manage tabs with their views

-   Managing the closing of modules, split up into two parts:

    -   Stopping:
        -   Halts communication and processing of data with the following procedure:
            -   Ask parent to disconnect/close/stop:
                -   Request may be ignored if not able to be closed now, or user confirmation may be requested
                -   On accept, parent sends 'stop' message to child and then removes child from state
            -   'stop' recursively sends 'stop' message to children:
                -   Stop messages can't be ignored
                -   Waits for children to stop before confirming having stopped itself
    -   Closing:
        -   Properly gets rid of all traces of the module to be garbage collected

-   Undo/redo facility:

    -   Command design pattern

-   I18N:

    -   Exact execution has to be discussed, ideas:
        -   Storage options:
            -   Add text data as settings such that they can even be changed per module instance
            -   Make language data ship with modules in a seperate file;
                -   But have multiple module's text overwrittable using a single 'language pack'
        -   Provide a dedicated react element that can be obtained from E.G. react's props:
            -   Allow for putting text/patterns as the children as a default 'translation'
            -   Allow for element children to be interleaved with the translation for dynamic 'texts'

-   Keyboard events and navigation:

    -   Must be discussed how and to what extent this can be implemented in a generic way

-   Scripting:

    -   Must be discussed how and to what extent this can be implemented in a generic way

-   Create automatic/semi automatic testing procedure of modules:

    -   Test serialization and deserialization
    -   Test how user closing module/childrenis handled

-   For settings create tools to manage generalized settings with conditions
