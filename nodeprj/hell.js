function getback(dataid, callback) {
    setTimeout(() => { console.log("data", dataid); callback(); }, 2000)
}

getback(1,
    () => {
        getback(2,
            () => {
                getback(3)
            })
    })
