const bcrypt = require('bcryptjs')

const hashPassword = (userPassword => {
  const salt = bcrypt.genSaltSync(10)
  const hash = bcrypt.hashSync(userPassword, salt)
  
  return hash
})

module.exports = {
  hashPassword
}