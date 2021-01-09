const bcrypt = require('bcryptjs');

function hashPasword(plainPassword) {
  const salt = bcrypt.genSaltSync(12);
  return bcrypt.hashSync(plainPassword, salt);
}

function comparePassword(plainPassword, hashedPasword) {
  return bcrypt.compareSync(plainPassword, hashedPasword)
}

module.exports = {
  hashPasword,
  comparePassword
}