const bcrypt = require('bcryptjs')
const user = require('../models/user')

function byecrypt(password) {
  const salt = bcrypt.genSaltSync(5)
  const hash = bcrypt.hashSync(password, salt)
  return hash
}

function comparePassword(userPassword, dbPassword) {
  return bcrypt.compareSync(userPassword, dbPassword)
}

module.exports = {byecrypt, comparePassword}