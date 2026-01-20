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