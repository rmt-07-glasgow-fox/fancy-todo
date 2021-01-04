const bcrypt = require('bcryptjs');

function hashPassword(userPassword) {
  const salt = bcrypt.genSaltSync(10);
  const hash = bcrypt.hashSync(userPassword, salt);
  return hash;
}

module.exports = { hashPassword }