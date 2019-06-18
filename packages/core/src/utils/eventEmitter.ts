/**
 * A class to be ectended by classses that may emit events
 */
export class EventEmitter {
    // The listeners for each even type
    protected listeners: {
        [type: string]: {
            name: string;
            listener: {(...args: any): void | Promise<any>};
        }[];
    } = {};

    constructor() {}

    /**
     * Emits an event of a specified type to all listeners, with the given paramaters
     * @param type The type of the event to emit
     * @param args The arguments to pass to all listeners
     * @returns All the non-undefined responses provided by listeners
     */
    protected emit(type: string, ...args: any): any[] {
        // Get the listeners for this type
        const listeners = (<EventEmitter>this).listeners[type];

        // Go through all listeners call them, and get their responses
        if (listeners) {
            let responses = listeners.map(listener => listener.listener(...args));

            // Filter out any undefined values
            return responses.filter(val => val !== undefined);
        }
    }

    /**
     * Emits an event of a specified type to all listeners, with the given paramaters
     * And retrieves all the responses from the listeners
     * @param type The type of the event to emit
     * @param args The arguments to pass to all listeners
     * @returns All the non-undefined responses provided by listeners
     */
    protected async emitAsync(type: string, ...args: any): Promise<any[]> {
        // Get the listeners for this type
        const listeners = (<EventEmitter>this).listeners[type];

        // Go through all listeners call them, and get their responses
        let responsePromises = [];
        if (listeners) {
            responsePromises = listeners.map(listener => listener.listener(...args));
        }

        // Await all responses
        const responses = await Promise.all(responsePromises);

        // Filter out any undefined values
        return responses.filter(val => val !== undefined);
    }

    /**
     * Adds a listener for a specific event type
     * @param type The type of the event to add a listener for
     * @param listener The function to call when an event of the given type is emited
     * @param name A name for this particular listener for identification, assumes names to be unique
     * @returns The name of the listener (generated if none was supplied)
     */
    public on(
        type: string,
        listener: {(...args: any): any | Promise<any>},
        name?: string
    ): string {
        // Make sure that an array for this event type is registered
        if (!this.listeners[type]) this.listeners[type] = [];

        // Get the listeners for this type
        const listeners = this.listeners[type];

        // Make sure we have unique name for the listener
        if (!name) {
            name = listeners.length + "";
            while (listeners.find(obj => obj.name == name)) name = Number(name) + 1 + "";
        }

        // Add the new listener
        listeners.push({
            name: name,
            listener: listener,
        });

        // Return the name (which might have been generated)
        return name;
    }

    /**
     * Removes a specific listener
     * @param type The type of the event for which to remove a listener
     * @param listener The listener to remove, or the name of the listener and assumes names to be unique
     * @returns Whether or not a listener was matched to remove
     */
    public off(
        type: string,
        listener: {(...args: any): any | Promise<any>} | string
    ): boolean {
        // Get the listeners for this type
        const listeners = this.listeners[type];
        if (!listeners) return;

        // Track the index of the listener to remove
        let index: number;

        // Check whether to remove a certain function, or name
        if (typeof listener == "string") {
            index = listeners.findIndex(obj => obj.name == listener);
        } else {
            index = listeners.findIndex(obj => obj.listener == listener);
        }

        // Remove the index, if found
        if (index >= 0) {
            listeners.splice(index, 1);
        }

        // Return whether or not the listener could be removed
        return index >= 0;
    }

    /**
     * Adds a listener for a specific event type, will only be fired once
     * Listeners added this way can't be removed by listener reference, only by passed name
     * @param type The type of the event to add a listener for
     * @param listener The function to call when an event of the given type is emited
     * @param name A name for this particular listener for identification, assumes names to be unique
     * @returns A promise resulting in the data once called
     */
    public once(
        type: string,
        listener?: {(...args: any): any | Promise<any>},
        name?: string
    ): Promise<any> {
        // Return a promise that gets resolved on callback
        return new Promise((resolve, reject) => {
            name = this.on(
                type,
                (...args: any[]) => {
                    // Remove the listener
                    this.off(type, name);

                    // Call the method that was passed if any
                    if (listener) listener.apply(this, args);

                    // Resolve the promise
                    resolve(args);
                },
                name
            );
        });
    }
}
