const bcryptjs = require('bcryptjs')

function generatePassword(data) {
    let salt = bcryptjs.genSaltSync(8)
    let hash = bcryptjs.hashSync(data, salt)
    return hash
}

function verifyPassword(password, passwordDb) {
    return bcryptjs.compareSync(password, passwordDb)
}

module.exports = {
    generatePassword,
    verifyPassword
}