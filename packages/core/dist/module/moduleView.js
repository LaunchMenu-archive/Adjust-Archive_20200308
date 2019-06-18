var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const react_1 = __importDefault(require("react"));
const viewManager_1 = require("../state/window/viewManager");
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
        // @ts-ignore
        this.state = this.getClass().initialState;
        // Make a shortcut to the module
        this.module = this.props.module;
    }
    // Management methods (people willhave to call super when overriding these :[ )
    /**
     * @override Will load the initial state and start listening for updates
     */
    componentWillMount() {
        viewManager_1.ViewManager.registerView(this, this.props.moduleID);
    }
    /**
     * @override Will stop listening for updates
     */
    componentWillUnmount() {
        viewManager_1.ViewManager.deregisterView(this, this.props.moduleID);
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
        this.setState(state);
        // @ts-ignore
        this.settings = state["~settings"];
    }
    /**
     * Updates the state of the view
     * @param state The parts of the state to update
     */
    updateState(state) {
        this.setState(state);
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
        // Render the loader while the state is not loaded
        if (Object.keys(this.state).length == 0)
            return this.renderLoader();
        // If an error eccured, render the error
        if (this.state.error)
            return this.renderError();
        // Renders the actual view otherwise
        return this.renderView();
    }
    /**
     * Renders a loader element
     * @returns An element to be displayed while the module is loading
     */
    renderLoader() {
        return react_1.default.createElement("span", null, "Loading");
    }
    /**
     * Renders a loader element
     * @returns An element to be displayed while the module is loading
     */
    renderError() {
        return react_1.default.createElement("span", { style: { color: "red" } }, this.state.error.toString());
    }
}
ModuleView.initialState = {}; // The initial state to be loaded for this class, will be replaced by createModuleView
exports.ModuleView = ModuleView;
//# sourceMappingURL=moduleView.js.map