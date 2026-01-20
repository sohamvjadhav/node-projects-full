const mysql = require("mysql2");
const db = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "",
    database: "main"
})

db.connect((err) => {
    if (err) {
        console.log("Connection Failed", err);
    }
    else {
        console.log("Connection Successfull");
    }
})

module.exports = db;