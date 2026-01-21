# Deleting Data: The Controller Pattern

## Introduction

In `insert.js` and `login.js`, we wrote all our logic directly inside the `app.post(...)` callback.
This works for small apps, but as your app grows, `server.js` becomes thousands of lines long.

In `delete.js`, we see a better way: **The Controller Pattern**.
Instead of putting the logic in the main file, we put it in a separate file and export it.

We also tackle the dangerous **DELETE** operation.

---

## Part 1: Route Parameters

When we want to delete something, we need to know *what* to delete.
We usually pass the ID of the item in the URL.
Example: `DELETE /student/5` (Delete student with ID 5).

In Express, we handle this using **Route Parameters**.
The route is defined as `/student/:id`.
The `:id` is a placeholder. Express captures whatever is in that position and puts it in `req.params`.

---

## Part 2: Code Analysis of `delete.js`

### The Code

```javascript
const db = require("./db");
exports.deleteStudent = (req, res) => {
    const { id } = req.params;
    const sql = "Delete from userdb where id= ?"
    db.query(sql, [id], (err) => {
        if (err) {
            res.status(500).json(err);
        }
        else {
            res.send({ message: "Deleted" });
        }
    });
}
```

### Line-by-Line Explanation

#### Block 1: The Export

```javascript
exports.deleteStudent = (req, res) => { ... }
```

*   **`exports`**: We are not creating `app` or `server` here. We are just exporting a function.
*   **The Signature**: The function accepts `(req, res)`, which matches the Express route handler signature.
*   **Usage**: In your main server file, you would write:
    ```javascript
    const { deleteStudent } = require("./delete");
    app.delete("/student/:id", deleteStudent);
    ```

#### Block 2: Extracting ID

```javascript
    const { id } = req.params;
```

*   **`req.params`**: This object holds the route parameters.
*   If the URL was `/student/42`, then `req.params` is `{ id: "42" }`.
*   We destructure `id` from it.

#### Block 3: The Query

```javascript
    const sql = "Delete from userdb where id= ?"
    db.query(sql, [id], ...)
```

*   **`DELETE FROM`**: The SQL command to remove rows.
*   **`WHERE id=`**: CRITICAL. If you forget the WHERE clause, **you will delete every user in the database**.
*   **Safety**: We use the `?` placeholder to ensure we delete exactly one ID, preventing injection.

## Summary

*   **Controller**: Logic lives in its own file.
*   **`req.params`**: Used to read variables from the URL (like IDs).
*   **DELETE**: The destructive SQL command.

This file demonstrates how to structure larger applications and handle targeted deletions.
