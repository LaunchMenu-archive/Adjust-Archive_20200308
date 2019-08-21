/**
 * A class to make only one process active at a time, when called through the excluder
 */
export class AsyncMutualExcluder {
    // The executing process, or undefined if there is no such process
    protected process: Promise<any>;

    // All the scheduled processes
    protected scheduledProcesses: {promise: Promise<any>; call: () => void}[] = [];

    /**
     * Schedules a process to be called when no processes are currently running
     * @param process The process to schedule
     * @returns The promise that resolves when the process finished
     */
    public schedule<T>(process: () => Promise<T>): Promise<T> {
        // Create the promise
        let call;
        let promise: Promise<T> = new Promise(res => {
            call = () => {
                const processPromise = process();
                // Add hook to invoke the next process when resolved
                processPromise.then(() => this.callNext(), () => this.callNext());

                // Return the promise
                res(processPromise);
            };
        });

        // Store the process
        this.scheduledProcesses.push({
            promise,
            call,
        });

        // Call the process if there is no executing process
        if (!this.process) this.callNext();

        // Return the promise
        return promise;
    }

    /**
     * Executes the next process in the que
     */
    protected callNext(): void {
        if (this.scheduledProcesses.length > 0) {
            // Save and execute the newly invoked process
            const process = this.scheduledProcesses.shift();
            this.process = process.promise;
            process.call();
        } else {
            // Indicate that there is no executing process
            this.process = null;
        }
    }
}
