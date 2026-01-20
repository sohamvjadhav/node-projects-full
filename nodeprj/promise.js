var p = new Promise(function (resolve, reject) {
    resolve("OK");
});
p.then((res) => { console.log("success:", res) });
p.catch((err) => { console.log("error:", err) });