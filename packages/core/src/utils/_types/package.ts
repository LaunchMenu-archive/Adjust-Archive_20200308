/**
 * A type representing an npm package
 */
export type Package = {
    name: string;
    version: string;
    description: string;
    dependencies: {[name: string]: string};
    devDependencies: {[name: string]: string};
    peerDependencies: {[name: string]: string};
    // TODO: add all other fields
};
