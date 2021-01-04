const bcrypt = require('bcryptjs')

const comparePassword = (userPassword, hashedPassword) => {
    return bcrypt.compareSync(userPassword, hashedPassword)
}

module.exports = comparePassword
