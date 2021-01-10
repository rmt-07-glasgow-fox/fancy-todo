const bcrypt = require("bcryptjs")

generatePass = (pass) => {
  const salt = bcrypt.genSaltSync(5)
  const hash = bcrypt.hashSync(pass, salt)
  
  return hash
}

comparePass = (pass, hashPass) => {
  return bcrypt.compareSync(pass, hashPass)
}

module.exports = {generatePass, comparePass}