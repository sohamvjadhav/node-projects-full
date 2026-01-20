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