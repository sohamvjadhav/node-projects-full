# Module Scope and Naming

## Introduction

In `mult.js`, we continue our exploration of the `math.js` consumers.
```javascript
const { mult } = require("./math");
console.log(mult(10, 5));
```

Let's use this opportunity to talk about **Naming** and **Scope Collision**. What if `mult.js` already had a function named `mult`? How does Node.js handle variable names across files?

---

## Part 1: Your Variables are Yours

One of the biggest fears in old web development (before modules) was **Global Namespace Pollution**. If you included two scripts that both used a variable named `x`, one would overwrite the other.

In Node.js:
1.  The variable `mult` inside `math.js` is private.
2.  The variable `mult` inside `mult.js` is also private to `mult.js`.

They just happen to point to the same function because we explicitly linked them.

### Renaming Imports
What if you wanted to call it `multiply` instead of `mult` in this file?
You can rename during destructuring:
```javascript
const { mult: multiply } = require("./math");
console.log(multiply(10, 5));
```
This is powerful. You can adapt the library's naming convention to fit your own code's style without changing the library itself.

---

## Part 2: Code Analysis of `mult.js`

### The Code

```javascript
const { mult } = require("./math");
console.log(mult(10, 5));
```

### Line-by-Line Explanation

#### Block 1: Import

```javascript
const { mult } = require("./math");
```

**Line 1:** `const { mult } = require("./math");`
*   Node.js checks its Module Cache. "Have I loaded `math.js` before?"
    *   If yes (e.g., in a larger app), it returns the cached exports immediately.
    *   If no, it reads the file.
*   It returns the `mult` function.

#### Block 2: Usage

```javascript
console.log(mult(10, 5));
```

**Line 2:** `console.log(mult(10, 5));`
*   `10 * 5 = 50`.
*   Prints `50`.

## Summary

*   **Scope Safety**: Modules prevent variable collision.
*   **Flexibility**: You can import functions and name them whatever you want (using aliasing).
*   **Caching**: `require` is smart; it doesn't reload the file every time if it's already in memory.

This file demonstrates the clean separation between the definition of a tool (`math.js`) and the usage of a tool (`mult.js`).
