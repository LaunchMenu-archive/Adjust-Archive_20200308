/**
 * A class to easily make sure one process (or set of processes) is finished before another is started
 */
export class AsyncSequencer {
    // The promise to await to make sure the process has finished
    public finished: Promise<void> = Promise.resolve();

    // The resolver for the finish promise
    protected resolveFinish: () => void;

    // The processes to wait for
    protected processes: {[ID: number]: true} = {};

    // Counts process IDs to ensure uniqueness
    protected processID: number = 0;

    /**
     * Adds a process to be awaited
     * @param func A async function to immediately call
     */
    public add<T>(func: () => Promise<T>): Promise<T>;

    /**
     * Adds a process to be awaited
     * @param func A promise to await
     */
    public add<T>(promise: Promise<T>): Promise<T>;

    /**
     * Adds a process to be awaited
     * @returns An ID that should be removed using 'remove' to indicate the process was finished
     */
    public add(): number;
    public add<T>(func?: (() => Promise<T>) | Promise<T>): number | Promise<T> {
        const ID = this.processID++;
        this.processes[ID] = true;

        // Make a new promise if needed
        if (!this.resolveFinish) {
            this.finished = new Promise(res => void (this.resolveFinish = res));
        }

        // Check whether to do an async call
        if (func) {
            const promise = func instanceof Function ? func() : func;

            // Remove the process when the promise resolves
            promise.then(
                () => this.remove(ID),
                e => {
                    this.remove(ID);
                    throw e;
                }
            );

            // Return the function's response
            return promise;
        } else {
            // If there is no function, just return the ID for manual resolving
            return ID;
        }
    }

    /**
     * Indicates that a process has finished
     * @param ID The ID of the process to remove (because of it having finished)
     * @returns Whether this was the last process in the sequencer
     */
    public remove(ID: number): boolean {
        delete this.processes[ID];

        // Check whether there are any processes left
        if (Object.keys(this.processes).length == 0) {
            if (this.resolveFinish) {
                this.resolveFinish();
                this.resolveFinish = null;
            }
            return true;
        }
        return false;
    }
}
