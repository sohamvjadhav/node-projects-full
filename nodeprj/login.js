const express = require("express");
const bodyparser = require("body-parser");
const cors = require("cors");
const db = require("./db");

const app = express();
app.use(cors());
app.use(bodyparser.urlencoded({ extended: true }));
app.use(bodyparser.json());

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

app.listen(3000, () => {
    console.log("Server running on port 3000");
});