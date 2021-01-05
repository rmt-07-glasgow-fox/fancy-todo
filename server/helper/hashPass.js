const bcrypt = require('bcryptjs')

function hashPass(pass){
    const salt = bcrypt.genSaltSync(10)
    const hash = bcrypt.hashSync(pass, salt)

    return hash
}

module.exports = hashPass