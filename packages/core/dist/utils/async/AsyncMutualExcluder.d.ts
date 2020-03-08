/**
 * A class to make only one process active at a time, when called through the excluder
 */
export declare class AsyncMutualExcluder {
    protected process: Promise<any>;
    protected scheduledProcesses: {
        promise: Promise<any>;
        call: () => void;
    }[];
    /**
     * Schedules a process to be called when no processes are currently running
     * @param process The process to schedule
     * @returns The promise that resolves when the process finished
     */
    schedule<T>(process: () => Promise<T>): Promise<T>;
    /**
     * Executes the next process in the que
     */
    protected callNext(): void;
}
