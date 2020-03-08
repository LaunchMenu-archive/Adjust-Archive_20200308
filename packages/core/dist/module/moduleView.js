var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const react_1 = __importDefault(require("react"));
const viewManager_1 = require("../window/viewManager");
const extendedObject_1 = require("../utils/extendedObject");
const moduleID_1 = require("./moduleID");
/**
 * A class that can visually represent the module
 */
class ModuleView extends react_1.default.Component {
    /**
     * Creates an instance of the module view
     * @param props The properties of this element
     */
    constructor(props) {
        super(props);
        // Indicates whether this react component has been completely unmounted
        this.unmounted = false;
        // Whether or not the data for this view has been initialized
        this.initialized = false;
        // @ts-ignore
        this.state = this.getClass().state;
        // Make a shortcut to the module
        this.module = this.props.module;
    }
    // Management methods (people willhave to call super when overriding these :[ )
    /**
     * @override Will load the initial state and start listening for updates
     */
    componentWillMount() {
        this.self = viewManager_1.ViewManager.registerView(this, new moduleID_1.ModuleReference(this.props.moduleID));
        this.self.catch(() => {
            // Unmounted before having been initalized
        });
    }
    /**
     * @override Will stop listening for updates
     */
    componentWillUnmount() {
        viewManager_1.ViewManager.deregisterView(this.self, new moduleID_1.ModuleReference(this.props.moduleID));
        this.unmounted = true;
    }
    // State methods
    getClass() {
        return this.__proto__.constructor;
    }
    /**
     * Loads the initial state into the view
     * @param state The state to load
     */
    loadInitialState(state) {
        // @ts-ignore
        this.settings = state["~settings"];
        // @ts-ignore
        this.data = state["~data"];
        this.setState(curState => {
            this.initialized = true;
            return this.getNewState(curState, state);
        });
    }
    /**
     * Updates the state of the view
     * @param state The parts of the state to update
     */
    changeState(state) {
        this.setState(curState => this.getNewState(curState, state));
    }
    /**
     * Augments the state changes to full state fields
     * ({something:{stuff:3}} to {something:{stuff:3, otherCurVal:5}})
     * @param oldState The current state data
     * @param changes The changed path values
     * @modifies changes
     */
    getNewState(oldState, changes) {
        return extendedObject_1.ExtendedObject.map(changes, ((value, key) => {
            const curValue = oldState[key];
            // Copy the missing values from current into the changes
            if (extendedObject_1.ExtendedObject.isPlainObject(value) &&
                (extendedObject_1.ExtendedObject.isPlainObject(curValue) || curValue instanceof Array)) {
                return extendedObject_1.ExtendedObject.copyData(value, curValue instanceof Array
                    ? curValue
                    : extendedObject_1.ExtendedObject.copyData(curValue, {}), undefined, false);
            }
            // If either the new or old value is not a plain object, return it
            return value;
        }));
    }
    // Error related methods
    /**@override */
    static getDerivedStateFromError(error) {
        // Update state so the next render will show the fallback UI.
        console.error(error);
        return { error };
    }
    //TODO: figure out typing
    /**@override */
    componentDidCatch(error, info) {
        console.error(error, info);
    }
    // Rendering methods
    /**
     * @override The normal react render method
     */
    render() {
        // @ts-ignore Update the settings
        this.settings = this.state["~settings"];
        // Renders replacement data if needed, or the actual view otherwise
        return this.notReadyRender() || this.renderView();
    }
    /**
     * Performs one of the render options if the module data isn't ready
     * @returns An appropriate rendering if the data isn't ready, or null otherwise
     */
    notReadyRender() {
        // Render the loader while the state is not loaded
        if (!this.initialized)
            return this.renderLoader();
        // If the module has stopped, render it stopped
        if (this.state.isStopped)
            return this.renderStopped();
        // If an error eccured, render the error
        if (this.state.error)
            return this.renderError();
    }
    /**
     * Renders a loader element
     * @returns An element to be displayed while the module is loading
     */
    renderLoader() {
        return react_1.default.createElement("span", null, "Loading");
    }
    /**
     * Renders an element if this module was stopped
     * @returns An element to be displayed when the module was stoppped
     */
    renderStopped() {
        return react_1.default.createElement("span", null, "Stopped");
    }
    /**
     * Renders an error element
     * @returns An element to be displayed when the module rendering errored
     */
    renderError() {
        return react_1.default.createElement("span", { style: { color: "red" } }, this.state.error.toString());
    }
}
ModuleView.state = {}; // The initial state to be loaded for this class, will be replaced by createModuleView
exports.ModuleView = ModuleView;
//# sourceMappingURL=moduleView.js.map