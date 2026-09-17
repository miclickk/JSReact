# JavaScript Runtime and Async - Homework

### 1. Private Counter (Closures)
The `count` variable is hidden inside the `createTask` function. You cannot change it directly from the outside. You can only update it using the `run()` method.

### 2. Call Stack Example
The Call Stack works as "Last In, First Out" (LIFO). When you click a button, `runTask()` is pushed to the stack, executes its synchronous code, and is popped off the stack when finished.

### 3. Non-blocking `setTimeout`
JavaScript is single-threaded. When it sees `setTimeout`, it sends the timer to the browser (Web API) to count in the background. JavaScript does not wait; it immediately moves to the next line of code.

### 4. Event Loop Output
* **Predicted Output:** 1 -> 2 -> 3 -> 4 -> 5 -> 6 -> 7
* **Actual Output:** 1 -> 2 -> 3 -> 4 -> 5 -> 6 -> 7
Sync code runs first, then Microtasks (Promises), and finally Macrotasks (setTimeout).

### 5. Tasks vs Microtasks
* **Microtasks (Promises, await):** VIP queue. They run immediately after the Call Stack is empty.
* **Tasks/Macrotasks (setTimeout):** Normal queue. They must wait until the Call Stack AND the Microtask queue are completely empty.

### 6. Multiple Promises & Errors
We use `Promise.allSettled([...])`. Unlike `Promise.all`, it does not stop if one task fails. It waits for every task to finish, whether they completed successfully or failed with an error.

### 7. Sequential vs Concurrent
* **Sequential (`await t1; await t2;`):** Tasks run one by one. Total time = sum of all times (Slower).
* **Concurrent (`Promise.allSettled`):** All tasks start at the same time. Total time = time of the longest task (Faster).