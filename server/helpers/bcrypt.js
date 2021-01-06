const bcrypt = require('bcryptjs')

function hashPassword(userPassword){
  const salt = bcrypt.genSaltSync(10)
  const hash = bcrypt.hashSync(userPassword, salt)
  return hash
}

function comparePassword(userPassword, hashPassword){
  return bcrypt.compareSync(userPassword, hashPassword)
}

module.exports = {
  hashPassword,
  comparePassword
}