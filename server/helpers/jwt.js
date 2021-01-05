const jwt = require('jsonwebtoken');
const SECRET_KEY = "ralfFanCYToDo";

let generateToken = payload => jwt.sign(payload, SECRET_KEY);

module.exports = { generateToken };