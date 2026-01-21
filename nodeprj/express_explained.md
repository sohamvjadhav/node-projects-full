# Building a Web Server: The Easy Way (Express.js)

## Introduction

In `server.js`, we built a server using the raw `http` module. It required manual parsing of URLs and a lot of `if/else` logic.

Now, we introduce **Express.js**. Express is a **Framework**.
*   A **Library** (like `fs`) is a tool you use.
*   A **Framework** (like Express) is a skeleton you build upon. It dictates the structure of your application and provides powerful shortcuts.

In this guide, we will analyze `express.js` and see how it simplifies everything we did in `server.js`.

---

## Part 1: The Express Philosophy

Express allows us to think in terms of **Routes** and **Verbs**.
Instead of checking `if (req.url === ...)` inside one giant function, we define small, specific functions for each page.

*   `app.get('/')`: "When someone GETs the home page, do this."
*   `app.post('/login')`: "When someone POSTs data to login, do this."

This is much cleaner and easier to organize.

---

## Part 2: Code Analysis of `express.js`

### The Code

```javascript
const express = require("express");
const app = express();

app.get("/", (req, res) => {
    res.send("Home Page");
});

app.get("/about", (req, res) => {
    res.send("About Page");
});

app.use((req, res) => {
    res.status(404).send("Page not found");
});

app.listen(3000, () => {
    console.log("Running");
});
```

### Line-by-Line Explanation

#### Block 1: Setup

```javascript
const express = require("express");
const app = express();
```

**Line 1:** `const express = require("express");`
*   Import the Express package. (Note: You must install this via `npm install express` first).

**Line 2:** `const app = express();`
*   Initialize the application. `app` is now our server object, packed with features.

#### Block 2: Defining Routes

```javascript
app.get("/", (req, res) => {
    res.send("Home Page");
});
```

**Line 4:** `app.get("/", ...)`
*   **`get`**: This specifies the **HTTP Method**. It only listens for GET requests (browsers send GET requests by default when you visit a site).
*   **`"/"`**: The URL path.
*   **`(req, res) => { ... }`**: The callback function.
    *   **`res.send(...)`**: This is a super-powered version of `res.end()`. It automatically detects if you are sending text, HTML, or JSON, and sets the correct headers for you.

#### Block 3: Handling 404s (Middleware)

```javascript
app.use((req, res) => {
    res.status(404).send("Page not found");
});
```

**Line 13:** `app.use(...)`
*   **Middleware**: This function runs for *every* request that hasn't been handled yet.
*   Since we placed it **after** our routes, it acts as a "Catch-All". If the user asked for `/` or `/about`, the code stopped there. If they asked for `/random`, the code falls through to here.
*   **`res.status(404)`**: We explicitly tell the browser "This is an error" (Status code 404). In `server.js`, we didn't do this, so the browser thought the error message was a successful page!

## Summary

*   **Express**: Simplifies server creation.
*   **`app.get`**: Handles GET requests for specific URLs.
*   **`res.send`**: A smart utility for sending responses.
*   **Middleware**: Use `app.use` at the end to catch 404 errors.

This is the foundation of modern Node.js development.
