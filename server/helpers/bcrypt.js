const bcrypt = require('bcryptjs');

function hashPassword(userPassword) {
  const salt = bcrypt.genSaltSync(10);
  const hash = bcrypt.hashSync(userPassword, salt);
  return hash;
}

function comparePassword(userPassword, databasePassword){
  return bcrypt.compareSync(userPassword, databasePassword);
}

module.exports = { hashPassword, comparePassword }