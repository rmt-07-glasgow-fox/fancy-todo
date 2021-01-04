const bcrypt = require('bcryptjs')

const hashPassword = (userPassword) => {
    let hashedPassword = bcrypt.hashSync(userPassword, 10)

    return hashedPassword
}

module.exports = hashPassword
