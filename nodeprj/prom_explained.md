# Building Asynchronous Functions with Promises

## Introduction

We have explored the raw mechanics of a Promise in `promise.js`. We learned that a Promise is like a restaurant ticket—a placeholder for a future value.

However, in `promise.js`, we cheated a little. We resolved the promise immediately (`resolve("OK")`). Real-world tasks aren't immediate. They take time.

In this file, `prom.js`, we are going to bridge the gap. We will combine the delay mechanism (`setTimeout`) from our "Callback Hell" days with the elegance of Promises. We will learn how to create a reusable function that performs a task, waits for it to finish, and *then* notifies us using a Promise.

This pattern—a function that returns a Promise—is the standard way modern JavaScript libraries (like fetching data from a database or reading a file) are written.

---

## Part 1: The Promise Wrapper Pattern

### 1. The Goal
We want to create a function that does something that takes time (asynchronously) and lets the caller know when it's done.

### 2. The Old Way (Callbacks)
In the old days (like in `hell.js`), we had to accept a callback:
```javascript
function doWork(callback) {
    setTimeout(() => {
        callback("Done");
    }, 1000);
}
```

### 3. The New Way (Promises)
Now, instead of taking a callback, our function will **return a Promise**.
```javascript
function doWork() {
    return new Promise((resolve, reject) => {
        // Do async stuff here
    });
}
```
This is a powerful shift. The function doesn't need to know *what* you want to do next. It simply gives you a Promise object and says, "Here, attach your instructions to this."

---

## Part 2: Code Analysis of `prom.js`

Let's examine the code.

### The Code

```javascript
function asyncfunction() {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            resolve("Promise resolved");
        }, 1000);
    });
}
asyncfunction().then(resolve => {
    console.log(resolve);
});
```

### Line-by-Line Explanation

#### Block 1: The Asynchronous Function Definition

```javascript
function asyncfunction() {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            resolve("Promise resolved");
        }, 1000);
    });
}
```

**Line 1:** `function asyncfunction() {`
*   We define a standard function named `asyncfunction`. It takes no arguments.

**Line 2:** `    return new Promise((resolve, reject) => {`
*   **`return`**: This is the key. When someone calls `asyncfunction()`, they will immediately receive a Promise object.
*   **`new Promise(...)`**: We create the Promise.
*   **`(resolve, reject) => { ... }`**: This is the Executor function. It runs immediately.

**Line 3:** `        setTimeout(() => {`
*   Inside the executor, we start our asynchronous task. We use `setTimeout` to simulate a 1-second delay.
*   **Note**: This code is running inside the Promise, but the `setTimeout` pushes the inner callback to the "Web APIs" (or Node's timer module), allowing the main thread to continue unblocked.

**Line 4:** `            resolve("Promise resolved");`
*   This line is inside the `setTimeout` callback. It will run **after 1000ms (1 second)**.
*   **`resolve(...)`**: We call the `resolve` function provided by the Promise constructor.
*   **`"Promise resolved"`**: This is the value we are delivering.
*   **Effect**: This switches the Promise's state from **Pending** to **Resolved**. Any `.then()` attached to this promise will now be triggered.

**Line 5:** `        }, 1000);`
*   This closes the `setTimeout`. `1000` is the delay in milliseconds.

**Line 6:** `    });`
*   This closes the Executor function and the Promise constructor.

**Line 7:** `}`
*   This closes the `asyncfunction`.

**Summary of Block 1**: We have created a reusable tool. Whenever we call `asyncfunction()`, it starts a 1-second timer and gives us a Promise that will "ping" us when the timer is done.

#### Block 2: Consuming the Function

```javascript
asyncfunction().then(resolve => {
    console.log(resolve);
});
```

**Line 8:** `asyncfunction().then(resolve => {`
*   **`asyncfunction()`**: We call the function.
    1.  It creates a new Promise.
    2.  It starts the 1-second timer.
    3.  It returns the Promise object (which is currently in **Pending** state).
*   **`.then(...)`**: We immediately attach a handler to that returned Promise.
*   **`resolve`**: This is the name of the parameter for our callback function.
    *   *Note*: Naming this parameter `resolve` is slightly confusing usage in the example code. Usually, we name it `result`, `data`, or `res`. Here, it represents the value passed *into* the resolve function earlier (the string "Promise resolved"). It is **not** the `resolve` function itself.

**Line 9:** `    console.log(resolve);`
*   This code sits and waits. It does not run immediately.
*   After 1 second, the timer fires, the promise resolves, and this line is executed.
*   It prints the value: `"Promise resolved"`.

**Line 10:** `});`
*   Closes the `.then()` block.

---

## Part 3: The Flow of Time

To truly understand this, let's visualize the timeline.

1.  **T=0.000s**: The script starts.
2.  **T=0.001s**: `asyncfunction()` is called.
    *   Inside, `new Promise` is created.
    *   `setTimeout` is scheduled for 1 second later.
    *   The Promise (Pending) is returned.
3.  **T=0.002s**: `.then()` is attached to the Pending Promise.
4.  **T=0.003s**: The script finishes executing line 10. The main program is done! But Node.js doesn't exit because there is an active timer.
5.  ... *Silence for 1 second* ...
6.  **T=1.001s**: The timer fires. The callback inside `setTimeout` runs.
7.  **T=1.002s**: `resolve("Promise resolved")` is called.
    *   The Promise state changes to **Resolved**.
8.  **T=1.003s**: The `.then()` callback is put into the "Microtask Queue".
9.  **T=1.004s**: The JavaScript engine sees the microtask and runs it.
    *   `console.log("Promise resolved")` runs.
10. **T=1.005s**: No more tasks. Node.js exits.

## Summary

*   **Wrapping Async**: The pattern in `prom.js` is how we wrap old callback-based functions (like `setTimeout`, `fs.readFile`) into modern Promises.
*   **Return a Promise**: The function starts the work and returns the "ticket" (Promise) immediately.
*   **Resolve Later**: When the work is done, we call `resolve()` to notify the holder of the ticket.
*   **Consumption**: The caller uses `.then()` to define what to do next.

This file bridges the gap between the raw concept of a Promise and its practical application in asynchronous functions.
