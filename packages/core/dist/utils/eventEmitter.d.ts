/**
 * A class to be ectended by classses that may emit events
 */
export declare class EventEmitter {
    protected listeners: {
        [type: string]: {
            name: string;
            listener: {
                (...args: any): void | Promise<any>;
            };
        }[];
    };
    constructor();
    /**
     * Emits an event of a specified type to all listeners, with the given paramaters
     * @param type The type of the event to emit
     * @param args The arguments to pass to all listeners
     * @returns All the non-undefined responses provided by listeners
     */
    protected emit(type: string, ...args: any): any[];
    /**
     * Emits an event of a specified type to all listeners, with the given paramaters
     * And retrieves all the responses from the listeners
     * @param type The type of the event to emit
     * @param args The arguments to pass to all listeners
     * @returns All the non-undefined responses provided by listeners
     */
    protected emitAsync(type: string, ...args: any): Promise<any[]>;
    /**
     * Adds a listener for a specific event type
     * @param type The type of the event to add a listener for
     * @param listener The function to call when an event of the given type is emited
     * @param name A name for this particular listener for identification, assumes names to be unique
     * @returns The name of the listener (generated if none was supplied)
     */
    on(type: string, listener: {
        (...args: any): any | Promise<any>;
    }, name?: string): string;
    /**
     * Removes a specific listener
     * @param type The type of the event for which to remove a listener
     * @param listener The listener to remove, or the name of the listener and assumes names to be unique
     * @returns Whether or not a listener was matched to remove
     */
    off(type: string, listener: {
        (...args: any): any | Promise<any>;
    } | string): boolean;
    /**
     * Adds a listener for a specific event type, will only be fired once
     * Listeners added this way can't be removed by listener reference, only by passed name
     * @param type The type of the event to add a listener for
     * @param listener The function to call when an event of the given type is emited
     * @param name A name for this particular listener for identification, assumes names to be unique
     * @returns A promise resulting in the data once called
     */
    once(type: string, listener?: {
        (...args: any): any | Promise<any>;
    }, name?: string): Promise<any>;
}
