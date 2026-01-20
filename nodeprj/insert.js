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