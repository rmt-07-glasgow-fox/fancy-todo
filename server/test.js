function date() {
    return (new Date(new Date().setDate(new Date().getDate() - 1))).toJSON().slice(0, -14)
}

console.log(date())