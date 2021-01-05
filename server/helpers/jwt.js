const jwt = require ("jsonwebtoken")
const SECRET_KEY = "dontTellAnyone"

function getToken (payload) {
    const token = jwt.sign (payload, SECRET_KEY)
    return token
}

module.exports = {
    getToken
}