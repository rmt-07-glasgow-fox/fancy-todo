const jwt = require('jsonwebtoken');
const SECRET_KEY = process.env.SECRET_KEY

function generateToken(payload) {
    const accessToken = jwt.sign(payload, SECRET_KEY);
    return accessToken
}

function decodeToken(accessToken) {
    const decoded = jwt.verify(accessToken, SECRET_KEY);
    return decoded
}

module.exports = {generateToken, decodeToken}