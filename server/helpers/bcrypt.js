const bcrypt = require('bcryptjs')

function hashPassword(check){
    const salt = bcrypt.genSaltSync(5)
    const hash = bcrypt.hashSync(check, salt)
    return hash
}

function comparePassword(userPassword, check){
    return bcrypt.compareSync(userPassword, check)
}

module.exports = { hashPassword, comparePassword }