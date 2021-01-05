const bcrypt = require('bcryptjs')

function hashPassword(userPassword) {
    const salt = bcrypt.genSaltSync(10)
    const hash = bcrypt.hashSync(userPassword, salt)

    return hash
}

function isPasswordMatched(userPassword, dbHashPassword) {
    return bcrypt.compareSync(userPassword, dbHashPassword)
}

module.exports = {
    hashPassword,
    isPasswordMatched
}