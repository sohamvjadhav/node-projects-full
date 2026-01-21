# User Login: Reading and Verifying Data

## Introduction

We can create users (`register.js`). Now we need to let them back in.
Authentication (Login) is the process of verifying a user's identity.

In this guide, we will analyze `login.js`. It performs a **Read** operation (SELECT) to check if the credentials provided by the user match what we have in the database.

---

## Part 1: The Logic of Login

Login is effectively a question we ask the database:
"Do you have a user with **Email X** AND **Password Y**?"

1.  **Yes**: The database returns 1 row (the user). We let them in.
2.  **No**: The database returns 0 rows. We block them.

### Security Warning: Plaintext Passwords
In this educational code, we are storing passwords directly (`password = ?`).
**NEVER DO THIS IN REAL LIFE.**
If someone hacks your database, they will have everyone's passwords.
In a real app, you would **Hash** the password (turn it into random gibberish like `$2b$10$...`) before saving it. When logging in, you hash the input and compare the hashes.

We will proceed with the code as written for learning purposes, but remember this warning.

---

## Part 2: Code Analysis of `login.js`

### The Code

```javascript
// ... imports omitted for brevity ...

app.post("/login", (req, res) => {
    const { email, password } = req.body;
    const sql = "SELECT * FROM userdb WHERE email = ? AND password = ?";

    db.query(sql, [email, password], (err, result) => {
        if (err) {
            console.log(err);
            res.send({ "message": "Error" });
        }
        else if (result.length > 0) {
            res.send({ message: "Login Successful" });
        }
        else {
            res.send({ message: "Wrong email or password" });
        }
    });
});
```

### Line-by-Line Explanation

#### Block 1: The Query

```javascript
    const sql = "SELECT * FROM userdb WHERE email = ? AND password = ?";
```

*   **`SELECT *`**: Get all columns.
*   **`WHERE`**: Filters the search.
*   **`AND`**: Both conditions must be true. The email must match AND the password must match.

#### Block 2: Checking the Result

```javascript
        else if (result.length > 0) {
            res.send({ message: "Login Successful" });
        }
```

*   **`result`**: In `mysql2`, `result` is always an **Array** of rows.
*   **`result.length > 0`**: If the array has items, it means the database found a match. The user exists and the password is correct.

#### Block 3: Handling Failure

```javascript
        else {
            res.send({ message: "Wrong email or password" });
        }
```

*   If the array is empty (`length === 0`), no user matched those credentials. We send a generic error message.

## Summary

*   **SELECT**: Used to read data.
*   **Authentication**: Checking if a record exists that matches the credentials.
*   **Arrays**: Database results are arrays. Check the length to see if you found anything.

You now have a complete authentication flow: Register (Write) and Login (Read).
