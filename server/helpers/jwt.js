const jwt = require("jsonwebtoken");
const SECRET_KEY = process.env.SECRET_KEY;

function generateToken(payload) {
  // console.log(SECRET_KEY, "=====> INI SECRET KEY");
  return jwt.sign(payload, SECRET_KEY);
}

function checkToken(token) {
  // console.log(SECRET_KEY, "=====> INI SECRET KEY");
  // console.log(token, "=====> INI token");
  return jwt.verify(token, SECRET_KEY);
}

module.exports = { generateToken, checkToken }