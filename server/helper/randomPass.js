function randomPass() {
    return Math.random()*1000 + 'password sangat rahasia'
}

module.exports = {
    randomPass
}

console.log(randomPass())