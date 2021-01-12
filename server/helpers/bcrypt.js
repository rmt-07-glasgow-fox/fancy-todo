const bcrypt = require('bcryptjs');

function hashPassword (password) {
  const salt = bcrypt.genSaltSync(5)
  const hash = bcrypt.hashSync(password, salt)

  return hash
}

function checkPassword (password, dbpassword) {
  return bcrypt.compareSync(password, dbpassword)
}

module.exports = {
  hashPassword,
  checkPassword
}
