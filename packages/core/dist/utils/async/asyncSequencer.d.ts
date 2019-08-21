/**
 * A class to easily make sure one process (or set of processes) is finished before another is started
 */
export declare class AsyncSequencer {
    finished: Promise<void>;
    protected resolveFinish: () => void;
    protected processes: {
        [ID: number]: true;
    };
    protected processID: number;
    /**
     * Adds a process to be awaited
     * @param func A async function to immediately call
     */
    add<T>(func: () => Promise<T>): Promise<T>;
    /**
     * Adds a process to be awaited
     * @param func A promise to await
     */
    add<T>(promise: Promise<T>): Promise<T>;
    /**
     * Adds a process to be awaited
     * @returns An ID that should be removed using 'remove' to indicate the process was finished
     */
    add(): number;
    /**
     * Indicates that a process has finished
     * @param ID The ID of the process to remove (because of it having finished)
     * @returns Whether this was the last process in the sequencer
     */
    remove(ID: number): boolean;
}
