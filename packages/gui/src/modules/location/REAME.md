# Location Manager

The location manager is responsible for managing the locations, this entails:

-   Allowing modules to be opened in the location they specify
-   Keeping track of the modules that are contained at every location (both long term by settings from the modules, and short term by currently being opened here)
-   Allowing locations to be moved

## Locations

Locations are leafs of a tree of modules starting at the location manager (and thus ending at a location).
Inbetween we have so called 'location ancestors', and the final location is technically also a locationAncestor.
Every layer of the tree will contain a different type of location ancestor, the default setup of layers will be as follows:

-   Location manager (And also window manager)
-   Window module
-   Section manager (as well as individual sections)
-   Tabs manager (as well as individual tabs)
-   Location module

When talking about locations, we usually talk about the 'virtual location', just the concept of the location, rather than the actuall location module instance that represents it. The location holds 2 pieces of data, the ID to reference it, and hints. Hints is an object that can contain data for every level of the tree, to specify where the location should be present. This could for instance be to the left of another location tab, or above another location section.

## Moving locations

When moving 'locations' we can actually attempt to do 1 of 2 things: Moving an actual location, or moving a module to another location.

-   When moving an actual location:
    -   The location is removed
    -   A new location with same ID is created using hints
    -   Modules previously opened at this location are reopened
-   When moving a module to location, two options:

    -   The location containing the module doesn't contain any other modules:
        -   Simply move the whole location
        -   Same steps as above apply
    -   The location containing the module does contain other modules:
        -   Module is moved to a non existing location
        -   Same steps as above apply

## Related stuff to not forget

-   Configs can specify/create locations
-   Settings configs can specify functions to be called upon value changes
-   Settings store one or more location ids
-   Location manager tracks modulesettings using the location, in order to detect when a location is no longer used and can be destroyed
-   Location module can obtain the settings condition to change, through the ModuleReference (by converting it to a ModuleID and obtaining the module)
