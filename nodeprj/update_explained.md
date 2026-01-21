# Updating Data: The Full Picture

## Introduction

We have created (POST), read (GET), and deleted (DELETE). The final piece of the CRUD puzzle is **Update** (PUT or PATCH).

In `update.js`, we see a function that modifies an existing record. This is interesting because it needs information from **two** sources:
1.  **Who** to update (from the URL).
2.  **What** to update (from the Body).

---

## Part 1: The Logic of Update

Updating is a mix of identifying a record and providing new values.
*   **Identification**: Usually done via ID in the URL (`/student/10`).
*   **New Values**: Done via JSON in the body (`{ "name": "New Name" }`).

Our code must combine these two streams of information into one SQL query.

---

## Part 2: Code Analysis of `update.js`

### The Code

```javascript
const db = require("./db");
exports.updateStudent = (req, res) => {
    const { id } = req.params;
    const { name, email } = req.body;
    const sql = "UPDATE userdb SET name = ?, email = ? WHERE id = ?";
    db.query(sql, [name, email, id], (err, result) => {
        if (err) {
            res.status(500).json(err);
        } else {
            res.send({ message: "Updated" });
        }
    });
};
```

### Line-by-Line Explanation

#### Block 1: Gathering Inputs

```javascript
    const { id } = req.params;
    const { name, email } = req.body;
```

*   **`req.params`**: Gives us the ID (e.g., `10`).
*   **`req.body`**: Gives us the new data (e.g., `name="Soham"`, `email="s@s.com"`).

#### Block 2: The SQL Query

```javascript
    const sql = "UPDATE userdb SET name = ?, email = ? WHERE id = ?";
```

*   **`UPDATE userdb`**: The table we are modifying.
*   **`SET`**: The keyword introducing the changes.
    *   `name = ?`
    *   `email = ?`
*   **`WHERE id = ?`**: The condition. Only update rows where the ID matches.

#### Block 3: The Order of Arguments

```javascript
    db.query(sql, [name, email, id], ...)
```

**CRITICAL**: The array `[name, email, id]` must match the order of `?` in the SQL string.
1.  First `?`: `name`
2.  Second `?`: `email`
3.  Third `?`: `id`

If you swapped them (`[id, name, email]`), you would try to set the name to the ID, which would corrupt your data!

## Summary

*   **UPDATE**: Modifies existing rows.
*   **Mixed Inputs**: Uses both URL parameters and Body data.
*   **Order Matters**: Be very careful matching your array values to your SQL placeholders.

This completes the CRUD cycle. You now have files explaining every aspect of a standard database application.
