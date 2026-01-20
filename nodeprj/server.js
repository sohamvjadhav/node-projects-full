const http = require("http");
const server = http.createServer((req, res) => {
    if (req.url === "/") {
        res.end("Home Page");
    }
    else if (req.url === "/about") {
        res.end("About Page");
    }
    else {
        res.end("Page not found");
    }
});

server.listen(3000, () => {
    console.log("Running");
});
