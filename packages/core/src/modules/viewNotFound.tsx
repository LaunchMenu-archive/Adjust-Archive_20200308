import React from "react";
import {ViewNotFoundID, ViewNotFound} from "./viewNotFound.type";
import {createModuleView} from "../module/moduleViewClassCreator";
import {createModule} from "../module/moduleClassCreator";
import {Registry} from "../registry/registry";
import {InstanceModuleProvider} from "../registry/moduleProviders/instanceModuleProvider";

export const config = {
    initialState: {},
    getPriority: () => 1,
    settings: {},
    type: ViewNotFoundID,
};

/**
 * This module is automatically added by the window manager to ensure some ViewNotFound module exists
 */
export default class ViewNotFoundModule extends createModule(config)
    implements ViewNotFound {
    /** @override */
    protected onInit(): void {
        Registry.addProvider(new InstanceModuleProvider(ViewNotFoundID, this, () => 2));
    }

    /** @override */
    protected onReloadInit(): void {
        Registry.addProvider(new InstanceModuleProvider(ViewNotFoundID, this, () => 2));
    }
}

/**
 * A reference to ViewNotFoundModule is hardcoded into moduleView's props,
 * such that `target` is only available to views of classes that extend ViewNotFoundModule.
 * So be sure to extend this class if you are implementing the ViewNotFound contract in order to get proper intellisense
 */
export class ViewNotFoundView extends createModuleView(ViewNotFoundModule) {
    protected renderView(): JSX.Element {
        // `this.props.target` may be used to get info about the target to display,
        // but it may be absent if someone misuses this module (manually requesting it)
        if (!this.props.target)
            return <span>No view could be found for this module</span>;
        return <span>{this.props.target.cls.getPath()} didn't provide a view</span>;
    }
}

ViewNotFoundModule.setViewClass(ViewNotFoundView);
