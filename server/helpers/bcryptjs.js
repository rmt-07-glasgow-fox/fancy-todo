const bcrypt = require('bcryptjs')

function hashPassword(pass) {
    let salt = bcrypt.genSaltSync(9)
    return bcrypt.hashSync(pass, salt)
}

function comparePassword(pass, hashedPass) {
    return bcrypt.compareSync(pass, hashedPass)
}

module.exports = {
    hashPassword,
    comparePassword
}