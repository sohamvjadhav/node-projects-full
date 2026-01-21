# Building a Web Server: The Hard Way (Node.js HTTP)

## Introduction

We have learned about files, modules, and asynchronous code. Now, we are ready to tackle the main purpose of Node.js: **Building Web Servers**.

When you go to `google.com`, your browser talks to a server. That server receives your request and sends back a webpage.
In this guide, we will analyze `server.js`. We will build a web server from scratch using only the built-in `http` module. This is "The Hard Way" because later we will use tools (Express) to make it easier, but understanding the raw basics is essential for a true engineer.

---

## Part 1: The Request-Response Cycle

The web works on a simple conversation model:
1.  **Request**: The Client (Browser) sends a message. "Give me the home page."
2.  **Processing**: The Server receives the message, decides what to do.
3.  **Response**: The Server sends a message back. "Here is the HTML code."

### The `http` Module
Just like `fs` is for files, `http` is for networking. It allows your computer to speak the HTTP protocol—the language of the web.

---

## Part 2: Code Analysis of `server.js`

### The Code

```javascript
const http = require("http");
const server = http.createServer((req, res) => {
    if (req.url === "/") {
        res.end("Home Page");
    }
    else if (req.url === "/about") {
        res.end("About Page");
    }
    else {
        res.end("Page not found");
    }
});

server.listen(3000, () => {
    console.log("Running");
});
```

### Line-by-Line Explanation

#### Block 1: Setup

```javascript
const http = require("http");
```

**Line 1:** `const http = require("http");`
*   Import the built-in HTTP module.

#### Block 2: Creating the Server

```javascript
const server = http.createServer((req, res) => {
    // ... logic ...
});
```

**Line 2:** `const server = http.createServer((req, res) => {`
*   **`createServer`**: This function creates a new web server object.
*   **The Callback**: The function inside `(...)` is the **Request Handler**.
    *   This function runs **every single time** someone visits your site.
    *   **`req` (Request)**: An object containing details about what the user wants (URL, headers, type).
    *   **`res` (Response)**: An object used to send data back to the user.

#### Block 3: Routing (The Logic)

```javascript
    if (req.url === "/") {
        res.end("Home Page");
    }
    else if (req.url === "/about") {
        res.end("About Page");
    }
    else {
        res.end("Page not found");
    }
```

**Routing** is the act of directing traffic.
*   **`req.url`**: This property tells us what address the user typed (e.g., `/` or `/about`).
*   **`if (req.url === "/")`**: If they want the home page...
    *   **`res.end("Home Page")`**: Send the text "Home Page" and close the connection.
*   **`else if (req.url === "/about")`**: If they want the about page...
    *   **`res.end("About Page")`**: Send "About Page".
*   **`else`**: If they typed anything else (like `/random`)...
    *   **`res.end("Page not found")`**: Send an error message.

#### Block 4: Starting the Server

```javascript
server.listen(3000, () => {
    console.log("Running");
});
```

**Line 13:** `server.listen(3000, ...)`
*   A server needs a **Port**. Think of an IP address as a building, and a Port as a specific apartment number.
*   Port `3000` is a common default for development.
*   **The Callback**: When the server successfully starts listening, it runs this function (`console.log("Running")`).

## Summary

*   **`http.createServer`**: Creates the server.
*   **`req` / `res`**: The input and output of the server.
*   **Manual Routing**: We have to write `if/else` statements to handle different URLs.
*   **Listening**: The server must listen on a port to accept connections.

You have built a working web server! However, as you can see, writing `if/else` for every single page would get tedious. That's why we use frameworks like Express.
