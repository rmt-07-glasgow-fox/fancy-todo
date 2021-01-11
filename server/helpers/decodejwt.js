const jwt = require('jsonwebtoken');
const { JWT_SECRET_TOKEN } = process.env;

const cekToken = (token) => {
    return jwt.verify(token, JWT_SECRET_TOKEN)
}

module.exports = cekToken;