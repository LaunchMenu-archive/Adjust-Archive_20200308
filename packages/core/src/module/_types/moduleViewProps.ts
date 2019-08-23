import {ModuleReference, ModuleID} from "../moduleID";
import ViewNotFoundModule from "../../modules/viewNotFound";
import {Module} from "../module";

/**
 * The interface for the react properties, which can't be customised
 */
export type ModuleViewProps<M> = M extends ViewNotFoundModule
    ? {
          moduleID: string;
          module: M;
          target: {cls: typeof Module; id: ModuleID};
          children?: undefined;
      }
    : {
          moduleID: string;
          module: M;
          children?: undefined;
      };
