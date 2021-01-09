const jwt = require('jsonwebtoken');
const SECRET_KEY = process.env.SECRET_KEY;

function getToken (data) {
    let token = jwt.sign(data, SECRET_KEY);

    return token;
}

function cekToken (token) {
    return jwt.verify(token, SECRET_KEY);
}

module.exports = { getToken, cekToken };