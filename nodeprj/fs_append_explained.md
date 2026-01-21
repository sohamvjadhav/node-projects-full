# Verify Your Work: Append and Read

## Introduction

In the previous guides, we performed single actions: write a file, read a file, or append to a file.
In `fs_append.js`, we combine these actions into a logical workflow.

1.  Modify a file (Append).
2.  Verify the modification (Read).
3.  Display the result (Log).

This pattern—**Action -> Verification**—is the basis of all automated testing and reliable software engineering.

---

## Part 1: The Implicit Variable Trap

Take a look at line 3 of the code:
```javascript
data = fs.readFileSync("Data.txt", "utf-8");
```
Do you notice something missing?
There is no `const`, `let`, or `var` before `data`.

In non-strict JavaScript (sloppy mode), if you assign a value to a variable that hasn't been declared, JavaScript automatically creates a **Global Variable** for you.
While this works in this simple script, it is **bad practice**. It can lead to bugs where different parts of your program accidentally overwrite each other's data.

**Correct usage**:
```javascript
const data = fs.readFileSync(...);
```

We will proceed with the code as written, but keep in mind: always declare your variables!

---

## Part 2: Code Analysis of `fs_append.js`

### The Code

```javascript
const fs = require("fs")
fs.appendFileSync("Data.txt", " \n Soham Jadhav");
data = fs.readFileSync("Data.txt", "utf-8");
console.log(data);
```

### Line-by-Line Explanation

#### Block 1: Appending

```javascript
fs.appendFileSync("Data.txt", " \n Soham Jadhav");
```

**Line 2:** `fs.appendFileSync("Data.txt", " \n Soham Jadhav");`
*   This targets `Data.txt`.
*   It adds a space, a newline, and "Soham Jadhav" to the end.
*   **Context**: If you run this script 5 times, you will add this line 5 times! The file will keep growing. This is the nature of `append`.

#### Block 2: Reading (Verification)

```javascript
data = fs.readFileSync("Data.txt", "utf-8");
```

**Line 3:** `data = fs.readFileSync("Data.txt", "utf-8");`
*   We immediately open the file we just modified.
*   We read the *entire* content (the original content + the new appended content).
*   We store it in the variable `data`.

#### Block 3: Display

```javascript
console.log(data);
```

**Line 4:** `console.log(data);`
*   We print the full content to the screen.
*   This confirms to us that the append operation was successful.

## Summary

*   **Workflow**: Modify -> Read -> Verify.
*   **Accumulation**: Running an append script multiple times accumulates data.
*   **Variable Declarations**: Always use `const` or `let` to avoid polluting the global scope.

This script demonstrates how to programmatically check the result of your file operations.
