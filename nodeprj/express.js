const express = require("express");
const app = express();

app.get("/", (req, res) => {
    res.send("Home Page");
});

app.get("/about", (req, res) => {
    res.send("About Page");
});

// Catch-all for undefined routes
app.use((req, res) => {
    res.status(404).send("Page not found");
});

app.listen(3000, () => {
    console.log("Running");
});