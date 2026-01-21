# Reading Files in Node.js: Decding the Bytes

## Introduction

We have mastered the art of creating files (`fs.js`, `file.js`). We can write text to the disk. But writing is only half the story. A program that can write but not read is like a person who can speak but not listen.

In this guide, we will explore `readfile.js`. We will learn how to pull data from the hard drive back into our program's memory. We will also encounter a crucial concept in computing: **Character Encoding**.

---

## Part 1: The `readFileSync` Method

Just as we had `writeFileSync`, the `fs` module provides `readFileSync`.
*   **Sync**: It is synchronous. The program will pause at this line until the file is completely read into memory.
*   **Return Value**: Unlike `writeFileSync` (which returns `undefined`), `readFileSync` returns the **content** of the file.

### 1. The Missing Argument Mystery

If you write this:
```javascript
const data = fs.readFileSync("Soham.txt");
console.log(data);
```
You might expect to see "Soham Jadhav". Instead, you will see something like:
`<Buffer 53 6f 68 61 6d ...>`

**Why?**
Computers don't store "letters"; they store numbers (bytes). `53` is the hexadecimal number for the letter 'S'.
By default, `readFileSync` gives you the raw numbers—the **Buffer**. It assumes you might be reading an image or a song, so it doesn't try to guess.

### 2. The Encoding Solution

If you know the file contains text, you must tell Node.js how to translate those numbers into letters.
The standard translation book is called **UTF-8**.

When we pass `"utf-8"` as the second argument, we are telling Node.js: "Read these bytes, look them up in the UTF-8 dictionary, and give me back a proper String."

---

## Part 2: Code Analysis of `readfile.js`

### The Code

```javascript
const fs = require("fs")
console.log(fs.readFileSync("Soham.txt", "utf-8"));
```

### Line-by-Line Explanation

#### Block 1: Setup

```javascript
const fs = require("fs")
```

**Line 1:** `const fs = require("fs")`
*   Import the file system tools.

#### Block 2: Reading and Printing

```javascript
console.log(fs.readFileSync("Soham.txt", "utf-8"));
```

**Line 2:** `console.log(fs.readFileSync("Soham.txt", "utf-8"));`

This is a nested command. Let's break it from the inside out.

1.  **`fs.readFileSync("Soham.txt", "utf-8")`**:
    *   **Action**: Node.js looks for a file named `Soham.txt` in the current folder.
    *   **Error**: If the file does not exist, this function will **crash** the program with an error: `Error: ENOENT: no such file or directory`. (We should ideally use `try...catch` blocks to handle this, but for this simple script, a crash is acceptable).
    *   **Reading**: It reads the binary data.
    *   **Decoding**: It uses `"utf-8"` to convert the binary data "Soham Jadhav" into a JavaScript String.
    *   **Return**: It returns that string.

2.  **`console.log(...)`**:
    *   It takes the returned string and prints it to the terminal.

## Summary

*   **`readFileSync(path, encoding)`**: Reads a file synchronously.
*   **Encoding is Key**: Without `"utf-8"`, you get a Buffer. With it, you get a String.
*   **Reading what you Wrote**: This file reads the `Soham.txt` file we created in `fs.js`. If you haven't run `fs.js` yet, this script will fail!

This completes the circle of data persistence. You can now write data (`fs.js`) and read it back (`readfile.js`).
