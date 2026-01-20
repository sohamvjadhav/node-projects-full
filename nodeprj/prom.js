function asyncfunction() {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            resolve("Promise resolved");
        }, 1000);
    });
}
asyncfunction().then(resolve => {
    console.log(resolve);
});