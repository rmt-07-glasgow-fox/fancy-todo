const bcrypt = require('bcryptjs');

function hashPassword(userPassword) {
  const salt = bcrypt.genSaltSync(6);
  const hash = bcrypt.hashSync(userPassword, salt);
  return hash
}

function comparePassword(userPassword, hashPassword) {
  //hashPassword -> from database
  return bcrypt.compareSync(userPassword, hashPassword); // will return true or false
}

module.exports = {
  hashPassword,
  comparePassword
}