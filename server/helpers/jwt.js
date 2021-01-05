const jwt = require('jsonwebtoken');
const {
    JWT_SECRET,
    JWT_SECRET_REFRESH_TOKEN,
    JWT_ACCESS_TOKEN_EXPIRED,
    JWT_REFRESH_TOKEN_EXPIRED
} = process.env;

const generateToken = (payload) => {
    const token = jwt.sign(payload, JWT_SECRET, { expiresIn: JWT_ACCESS_TOKEN_EXPIRED });
    const refreshToken = jwt.sign(payload, JWT_SECRET_REFRESH_TOKEN, { expiresIn: JWT_REFRESH_TOKEN_EXPIRED });

    return { token, refreshToken }
}

module.exports = generateToken;