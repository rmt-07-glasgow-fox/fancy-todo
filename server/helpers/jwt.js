const jwt = require('jsonwebtoken');
const {
    JWT_SECRET,
    JWT_ACCESS_TOKEN_EXPIRED,
} = process.env;

const generateToken = (payload) => {
    const token = jwt.sign(payload, JWT_SECRET, { expiresIn: JWT_ACCESS_TOKEN_EXPIRED });

    return token
}

module.exports = generateToken;