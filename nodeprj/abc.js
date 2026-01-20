
function sum(a, b, call) {
    console.log(a + b);
}

function calc(a, b, sumcallback) {
    sumcallback(a, b);
}
calc(10, 20, sum);