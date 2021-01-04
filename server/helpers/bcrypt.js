const bcrypt = require("bcryptjs")

function hashPass(inputPass) {
  const salt = bcrypt.genSaltSync(8)
  const hash = bcrypt.hashSync(inputPass, salt)
  return hash
}

function compare (input, hash) {
  const isValidPass = bcrypt.compareSync(input, hash)
  return isValidPass
}

module.exports = {
  hashPass,
  compare
}