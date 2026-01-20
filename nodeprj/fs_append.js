const fs = require("fs")
fs.appendFileSync("Data.txt", " \n Soham Jadhav");
data = fs.readFileSync("Data.txt", "utf-8");
console.log(data);