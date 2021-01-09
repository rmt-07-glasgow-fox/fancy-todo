const bcrypt = require('bcrypt')
const saltRounds = 10

function hashPass (password) {
  let salt = bcrypt.genSaltSync(saltRounds)
  return bcrypt.hashSync(password, salt)
}

function compare (password, hash) {
  let check = bcrypt.compare(password, hash)
  return check
}

module.exports = {hashPass, compare};