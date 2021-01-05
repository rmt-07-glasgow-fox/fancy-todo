const jwt = require('jsonwebtoken');
const { JWT_SECRET } = process.env;

const cekToken = (token) => {
    return jwt.verify(token, JWT_SECRET)
}

module.exports = cekToken;