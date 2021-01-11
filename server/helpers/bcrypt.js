const bcrypt = require('bcryptjs')

function hashPassword(password){
    let salt = bcrypt.genSaltSync(4)
    let hash = bcrypt.hashSync(password, salt)
    return hash
}

function compare(password, dbPassword){
   return bcrypt.compareSync(password, dbPassword);
}

module.exports = {hashPassword, compare}