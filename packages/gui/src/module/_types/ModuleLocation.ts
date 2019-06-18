/**
 * A type to represent the default module location that can be passed in a config
 */
export type ModuleLocation = {
    id: string; // The identifier of the location to open in
    hints?: {}; // Any hints that can be used to create the location if absent
};
