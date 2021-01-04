// let dateNow = (new Date()).toJSON().slice(0, -14)
// console.log(dateNow)

function date() {
    return (new Date()).toJSON().slice(0, -14)
}

console.log(date())

console.log(new Date())