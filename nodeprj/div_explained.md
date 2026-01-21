# Architectural Thinking: Separation of Concerns

## Introduction

We conclude our tour of the `math.js` consumers with `div.js`.
```javascript
const { div } = require("./math");
console.log(div(10, 5));
```

By now, you understand `require` and destructuring. So, let's zoom out and look at the **Architecture**. Why is splitting code into `math.js`, `div.js`, `add.js` better than one giant file?

It comes down to **Separation of Concerns (SoC)**.

---

## Part 1: Division of Labor

Imagine a restaurant.
*   **The Chef (math.js)**: Knows how to cook (calculate). Doesn't care who eats it.
*   **The Waiter (div.js)**: Knows how to take an order and bring food. Doesn't know how to cook.

If the Chef changes the recipe (improves the division algorithm), the Waiter doesn't need to be retrained.
If the Waiter changes tables, the Chef doesn't care.

### The "Division by Zero" Example
Suppose we want to prevent the universe from imploding by stopping division by zero.
If we wrote `a / b` in every file, we would have to add `if (b === 0)` checks everywhere.
With our module system, we add it **once** in `math.js`:
```javascript
function div(a, b) {
    if (b === 0) return "Error";
    return a / b;
}
```
Instantly, `div.js` and every other file becomes safer.

---

## Part 2: Code Analysis of `div.js`

### The Code

```javascript
const { div } = require("./math");
console.log(div(10, 5));
```

### Line-by-Line Explanation

#### Block 1: Import

```javascript
const { div } = require("./math");
```

**Line 1:** `const { div } = require("./math");`
*   Imports the `div` function.

#### Block 2: Usage

```javascript
console.log(div(10, 5));
```

**Line 2:** `console.log(div(10, 5));`
*   `10 / 5 = 2`.
*   Prints `2`.

## Summary

*   **Separation of Concerns**: Different files have different jobs.
*   **Centralized Logic**: Business rules (like math logic) live in one place.
*   **Simplicity**: `div.js` is incredibly simple because it offloaded the complexity to `math.js`.

This concludes our exploration of the Node.js Module System. You now know how to create libraries (`math.js`) and how to use them (`div.js` et al.).
