const express = require("express");
const bodyparser = require("body-parser");
const cors = require("cors")
const db = require("./db")

const app = express();
app.use(cors());
app.use(bodyparser.urlencoded({ extended: true }));
app.use(bodyparser.json());

app.post("/add-product", (req, res) => {
    const { name, price, description, image, email } = req.body;
    const sql = "INSERT INTO products (name, price, description, image, email) VALUES (?, ?, ?, ?, ?)";
    db.query(sql, [name, price, description, image, email], (err, result) => {
        if (err) {
            console.log(err);
            res.send({ message: "Error" });
        } else {
            res.send({ message: "Product Added" });
        }
    });
});

app.listen(3000, () => {
    console.log("Server running on port 3000");
});