Object.defineProperty(exports, "__esModule", { value: true });
/**
 * A class to make only one process active at a time, when called through the excluder
 */
class AsyncMutualExcluder {
    constructor() {
        // All the scheduled processes
        this.scheduledProcesses = [];
    }
    /**
     * Schedules a process to be called when no processes are currently running
     * @param process The process to schedule
     * @returns The promise that resolves when the process finished
     */
    schedule(process) {
        // Create the promise
        let call;
        let promise = new Promise(res => {
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
        if (!this.process)
            this.callNext();
        // Return the promise
        return promise;
    }
    /**
     * Executes the next process in the que
     */
    callNext() {
        if (this.scheduledProcesses.length > 0) {
            // Save and execute the newly invoked process
            const process = this.scheduledProcesses.shift();
            this.process = process.promise;
            process.call();
        }
        else {
            // Indicate that there is no executing process
            this.process = null;
        }
    }
}
exports.AsyncMutualExcluder = AsyncMutualExcluder;
//# sourceMappingURL=AsyncMutualExcluder.js.map