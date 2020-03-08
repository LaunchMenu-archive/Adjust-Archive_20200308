import {createConfig, createModule} from "../../../module/moduleClassCreator";
import {React} from "../../../React";
import {createModuleView} from "../../../module/moduleViewClassCreator";
import {SettingsSearchBar, SettingsSearchBarType} from "./SettingsSearchBar.type";
import {SearchBox} from "office-ui-fabric-react";

const SettingsSearchBarConfig = createConfig({
    state: {search: ""},
    settings: {},
    type: SettingsSearchBarType,
});

export class SettingsSearchBarModule extends createModule(SettingsSearchBarConfig)
    implements SettingsSearchBar {
    /**
     * Updates the current search value, and informs the parent after some debounce delay
     * @param search The new search value
     */
    public setSearch(search: string): void {
        this.changeState({search});
    }

    /**
     * Sends the new search value to the parent
     */
    public updateSearch(): void {
        this.getParent().updateSearch(this.state.search);
    }
}
export default SettingsSearchBarModule;

export class SettingsSearchBarView extends createModuleView(SettingsSearchBarModule) {
    public renderView(): JSX.Element {
        return (
            <SearchBox
                placeholder="Search"
                value={this.state.search}
                onChange={e => this.module.setSearch(e.target.value)}
                onSearch={() => this.module.updateSearch()}
                onBlur={() => this.module.updateSearch()}
                underlined={true}
                iconProps={{iconName: "Search"}}
            />
        );
    }
}
