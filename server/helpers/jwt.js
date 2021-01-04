const jwt = require("jsonwebtoken")
const SECRET_KEY = "mine"

function makeToken(payload) {
    const token = jwt.sign(payload, SECRET_KEY)
    return token
}

module.exports = makeToken