# Importing Modules: The Client Side

## Introduction

We have built our library in `math.js`. It contains four powerful mathematical functions. But a library sitting on a shelf is useless; someone needs to read it.

In this guide, we will analyze `add.js`. This file acts as a **Client** or **Consumer** of the `math.js` module. We will learn how to link two files together using `require`.

---

## Part 1: The `require` Path

### 1. Built-in vs. Local Modules
When we imported the file system, we used:
```javascript
require("fs");
```
When we import our own file, we use:
```javascript
require("./math");
```

**The Dot (`.`)**:
The `./` is mandatory. It tells Node.js: "Don't look in the global `node_modules` folder. Look in the **current directory**."
*   `math` -> Look for a package named "math" installed from npm.
*   `./math` -> Look for a file named "math.js" right here.

### 2. Destructuring Assignment

When `require("./math")` runs, it returns the `module.exports` object from `math.js`.
That object looks like:
```javascript
{
    add: [Function: add],
    sub: [Function: sub],
    mult: [Function: mult],
    div: [Function: div]
}
```

We could do this:
```javascript
const math = require("./math");
console.log(math.add(10, 5));
```

But we only want `add`. So we use **Destructuring**:
```javascript
const { add } = require("./math");
```
This syntax says: "I know the result is an object. Please extract the `add` property from it and create a variable named `add`."

---

## Part 2: Code Analysis of `add.js`

### The Code

```javascript
const { add } = require("./math");
console.log(add(10, 5));
```

### Line-by-Line Explanation

#### Block 1: Import

```javascript
const { add } = require("./math");
```

**Line 1:** `const { add } = require("./math");`
*   **Load**: Node.js finds `math.js`, executes it, and grabs its exports.
*   **Extract**: It pulls out the `add` function.
*   **Assign**: It creates a constant named `add` holding that function.

#### Block 2: Usage

```javascript
console.log(add(10, 5));
```

**Line 2:** `console.log(add(10, 5));`
*   It calls `add(10, 5)`.
*   Inside `math.js`, `10 + 5` is calculated.
*   `15` is returned.
*   `console.log` prints `15`.

## Summary

*   **`./`**: Essential for importing local files.
*   **Destructuring**: A clean way to unpack the tools you need from a module.
*   **Inter-file Communication**: `add.js` is using code that lives in `math.js`.

This completes the connection. You have successfully split your code across files and reconnected it.
