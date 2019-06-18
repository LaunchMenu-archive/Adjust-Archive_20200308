export * from "@adjust/core";

// Add emotion and MaterialUI for styling
export * from "@emotion/core";
export {React} from "./React";
export * from "@material-ui/core";

// Reolace some standard adjust classes by our extended versions
export {Registry} from "./registry/registry";
export {Module} from "./module/module";
export {ModuleClassCreator, createModule} from "./module/moduleClassCreator";
