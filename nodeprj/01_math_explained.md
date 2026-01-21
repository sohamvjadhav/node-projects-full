# Creating Modules in Node.js: The CommonJS Standard

## Introduction

As we write more code, putting everything in one file becomes messy. Imagine a book without chapters—just one long stream of text. It would be impossible to read or maintain.

In software, we solve this by splitting code into **Modules**.
A module is a separate file that groups related code together.

In this guide, we will analyze `math.js`. This file is not meant to be run directly. Instead, it is a **Library**—a collection of helper functions intended to be used by *other* files. We will learn about the **CommonJS** module system, which is the standard way Node.js handles modules.

---

## Part 1: Encapsulation and Exports

### 1. The Private Scope
In Node.js, every file is its own little world.
If you define a function `add` in `math.js`, it is **private** by default. Another file (like `server.js`) cannot see it or use it. This is called **Encapsulation**. It prevents variables in one file from accidentally messing up variables in another file.

### 2. The `module.exports` Object
To make a function available to the outside world, you must explicitly **Export** it.
Node.js provides a special object called `module`. This object has a property called `exports`.

Whatever you assign to `module.exports` becomes the "public face" of your file. When another file `require`s your file, they get whatever is inside `module.exports`.

---

## Part 2: Code Analysis of `math.js`

### The Code

```javascript
function add(a, b) {
    return a + b;
}

function sub(a, b) {
    return a - b;
}

function mult(a, b) {
    return a * b;
}

function div(a, b) {
    return a / b;
}

module.exports = { add, sub, mult, div };
```

### Line-by-Line Explanation

#### Block 1: Defining Functions

```javascript
function add(a, b) {
    return a + b;
}
// ... sub, mult, div ...
```

These are standard JavaScript functions.
*   **Pure Functions**: They take input (`a`, `b`) and return output. They don't change any global state or read files. This makes them very easy to test and reuse.
*   **Scope**: At this point, these functions are trapped inside `math.js`.

#### Block 2: Exporting

```javascript
module.exports = { add, sub, mult, div };
```

**The Object Literal Shorthand**:
You might be used to seeing objects like this:
```javascript
{
    add: add,
    sub: sub
}
```
In modern JavaScript (ES6), if the property name (`add`) is the same as the variable name (`add`), you can just write it once: `{ add }`.

**What is happening here?**
1.  We create a new Object: `{ add: [Function: add], sub: [Function: sub], ... }`.
2.  We assign this object to `module.exports`.

Now, `module.exports` is a package containing our four tools.

## Summary

*   **Modules**: Separate files for separate concerns.
*   **Encapsulation**: Code is private by default.
*   **`module.exports`**: The gateway to the outside world.
*   **Library**: `math.js` is a library module, designed to be imported, not run.

In the next guides, we will see how to consume this library.
