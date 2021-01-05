const bcrypt = require("bcryptjs")

function hashPass(inputPass) {
  const salt = bcrypt.genSaltSync(10)
  const hash = bcrypt.hashSync(inputPass, salt)
  return hash
}

function compare (password, hash) {
  const isValidPass = bcrypt.compareSync(password, hash)
  return isValidPass
}

module.exports = { hashPass, compare }