const jwt = require('jsonwebtoken');
const SECRET_KEY = process.env.SECRET_KEY;

let generateToken = payload => jwt.sign(payload, SECRET_KEY);

let checkToken = token => jwt.verify(token, SECRET_KEY);

module.exports = { generateToken, checkToken };