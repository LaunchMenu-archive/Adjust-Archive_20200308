Object.defineProperty(exports, "__esModule", { value: true });
/**
 * A class to easily make sure one process (or set of processes) is finished before another is started
 */
class AsyncSequencer {
    constructor() {
        // The promise to await to make sure the process has finished
        this.finished = Promise.resolve();
        // The processes to wait for
        this.processes = {};
        // Counts process IDs to ensure uniqueness
        this.processID = 0;
    }
    add(func) {
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
            promise.then(() => this.remove(ID), e => {
                this.remove(ID);
                throw e;
            });
            // Return the function's response
            return promise;
        }
        else {
            // If there is no function, just return the ID for manual resolving
            return ID;
        }
    }
    /**
     * Indicates that a process has finished
     * @param ID The ID of the process to remove (because of it having finished)
     * @returns Whether this was the last process in the sequencer
     */
    remove(ID) {
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
exports.AsyncSequencer = AsyncSequencer;
//# sourceMappingURL=AsyncSequencer.js.map