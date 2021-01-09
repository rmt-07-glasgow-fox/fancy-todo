const jwt = require('jsonwebtoken')

function generateToken(payload) {
    const token = jwt.sign(payload, process.env.SECRET)
        console.log(token, ">>>test");
    return token
}


function verifyToken(token) {
    console.log(token, ">>>>token");
    return jwt.verify(token, process.env.SECRET)
    // compare token
}

module.exports = {generateToken, verifyToken}