const jwt = require('jsonwebtoken');
const SECRET_KEY = 'mysacretjwtkey'

function getToken (data) {
    let token = jwt.sign(data, SECRET_KEY);

    return token;
}

module.exports = { getToken };