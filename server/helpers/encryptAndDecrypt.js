const bcrypt = require('bcryptjs')
const salt = bcrypt.genSaltSync(10)

class encryptAndDecrypt {
  static encryptPassword(password){
    return bcrypt.hashSync(password, salt)
  }
  
  static decryptPassword(password, hashedPassword){
    return bcrypt.compareSync(password, hashedPassword)
  }
}

module.exports = encryptAndDecrypt