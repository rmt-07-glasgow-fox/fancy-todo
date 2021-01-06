const bcrypt = require('bcrypt')

function hashPassword (password) {
    const salt = bcrypt.genSaltSync(10);
    const hash = bcrypt.hashSync(password, salt);
    return hash
}

function comparePassword (userPassword, dbPassword) {
    return bcrypt.compareSync(userPassword, dbPassword)
}

module.exports = { hashPassword, comparePassword }