const express = require("express");
const bodyparser = require("body-parser");
const cors = require("cors")
const db = require("./db")

const app = express();
app.use(cors());
app.use(bodyparser.urlencoded({ extended: true }));
app.use(bodyparser.json());

app.post("/register", (req, res) => {
    const { name, email, password } = req.body;
    const sql = "INSERT INTO userdb (name, email, password) VALUES (?, ?, ?)";
    db.query(sql, [name, email, password], (err, result) => {
        if (err) {
            console.log(err);
            res.send({ message: "Error" });
        } else {
            res.send({ message: "Student Added" });
        }
    });
});

app.listen(3000, () => {
    console.log("Server running");
});
