# Inserting Data: Building an API Endpoint

## Introduction

We have a server (`express`) and a database (`db`). Now let's make them do something useful together.
The most common operation in any app is creating data.
*   Sign up (Create User).
*   Post a tweet (Create Tweet).
*   Upload a photo (Create Photo).

In this guide, we will analyze `insert.js`. We will build an API endpoint that accepts data from a user and saves it into our MySQL database.

---

## Part 1: Security and SQL Injection

Before we look at the code, we must discuss **SQL Injection**.
This is the #1 way websites get hacked.

Imagine you have a query like this:
```javascript
"INSERT INTO users (name) VALUES ('" + req.body.name + "')"
```
If a user sets their name to `soham', 'admin') --`, the query becomes valid SQL that does things you didn't intend. They could delete your database or steal passwords.

**The Solution: Placeholders (`?`)**
Never concatenate strings for SQL. Use `?`.
```javascript
db.query("INSERT INTO users (name) VALUES (?)", [req.body.name])
```
The database driver (`mysql2`) will automatically sanitize the input, making it safe.

---

## Part 2: Code Analysis of `insert.js`

### The Code

```javascript
const db = require("./db");
const express = require("express");
const app = express();
app.use(express.json());

app.post("/add-userdb", (req, res) => {
    const { name, email, password } = req.body;

    const sql = "INSERT INTO userdb (name, email, password) VALUES (?, ?, ?)";
    db.query(sql, [name, email, password], (err, result) => {
        if (err) {
            res.status(500).json(err);
        } else {
            res.json({ message: "Student Added" });
        }
    });
});

app.listen(3000, () => {
    console.log("Server running");
});
```

### Line-by-Line Explanation

#### Block 1: Body Parsing

```javascript
app.use(express.json());
```

**Line 4:** `app.use(express.json());`
*   When a user sends data (JSON) to our server, it arrives as a raw stream of bytes.
*   This built-in middleware converts those bytes into a JavaScript Object that we can access via `req.body`.
*   Without this line, `req.body` would be `undefined`.

#### Block 2: The Route

```javascript
app.post("/add-userdb", (req, res) => {
    const { name, email, password } = req.body;
```

**Line 6:** `app.post("/add-userdb", ...)`
*   We use `POST` because we are creating data.
*   **Destructuring**: We extract `name`, `email`, and `password` from the incoming request body.

#### Block 3: The Query

```javascript
    const sql = "INSERT INTO userdb (name, email, password) VALUES (?, ?, ?)";
    db.query(sql, [name, email, password], (err, result) => {
```

**Line 9:** `const sql = ...`
*   We write our SQL command.
*   **`VALUES (?, ?, ?)`**: These are the placeholders. We have 3 placeholders for 3 values.

**Line 10:** `db.query(sql, [name, email, password], ...)`
*   We pass the SQL.
*   We pass an **Array** of values. Node.js maps them:
    *   `name` -> First `?`
    *   `email` -> Second `?`
    *   `password` -> Third `?`

#### Block 4: Handling the Result

```javascript
        if (err) {
            res.status(500).json(err);
        } else {
            res.json({ message: "Student Added" });
        }
```

*   **Error**: If the DB fails (e.g., duplicate email), `err` will exist. We send a 500 status code (Server Error) and the error details.
*   **Success**: If it works, we send a JSON message confirming success.

## Summary

*   **POST**: The method for creating data.
*   **`express.json()`**: Essential for reading JSON input.
*   **Placeholders**: The `?` syntax prevents hacking.

You have now built a secure way to save data!
