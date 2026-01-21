# The Power of Modularity: The DRY Principle

## Introduction

In `sub.js`, we see code that looks almost identical to `add.js`.
```javascript
const { sub } = require("./math");
console.log(sub(10, 5));
```

Since the syntax is familiar, let's discuss the **Why**. Why did we bother creating `math.js`? Why not just write `function sub(a,b) { return a-b }` inside `sub.js`?

The answer lies in one of the most important acronyms in software engineering: **DRY**.

---

## Part 1: Don't Repeat Yourself (DRY)

Imagine you are building a large banking application. Subtraction is used in 100 different files (calculating balance, fees, taxes, etc.).

**Scenario A: Copy-Paste**
You copy the subtraction logic into all 100 files.
Later, you realize there is a bug (maybe floating point precision errors). You now have to find and fix that bug in 100 different places.

**Scenario B: Modularity (The Node.js Way)**
You define the subtraction logic **once** in `math.js`.
You import it in 100 files.
When you find the bug, you fix it in `math.js`.
Suddenly, all 100 files are fixed automatically.

`sub.js` is a beneficiary of this architecture. It doesn't need to know *how* to subtract; it just needs to know *who* can do it.

---

## Part 2: Code Analysis of `sub.js`

### The Code

```javascript
const { sub } = require("./math");
console.log(sub(10, 5));
```

### Line-by-Line Explanation

#### Block 1: Import

```javascript
const { sub } = require("./math");
```

**Line 1:** `const { sub } = require("./math");`
*   This time, we destructure `sub` from the exports.
*   Note that we can pick and choose. We didn't ask for `add` or `div`. This keeps our current file memory footprint slightly cleaner (though Node.js still loads the whole `math.js` module into its cache).

#### Block 2: Usage

```javascript
console.log(sub(10, 5));
```

**Line 2:** `console.log(sub(10, 5));`
*   Calls the function.
*   Result: `5`.

## Summary

*   **DRY**: Define logic once, use everywhere.
*   **Maintenance**: Centralized code is easier to fix and upgrade.
*   **Consistency**: `math.js` acts as the "Single Source of Truth" for math operations.

By using `require`, `sub.js` delegates the responsibility of calculation to `math.js`.
