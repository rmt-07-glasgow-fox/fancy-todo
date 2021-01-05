const bcrypt = require('bcryptjs');

module.exports = {
    hashPassword: (userPassword) => {
        let salt = bcrypt.genSaltSync(10);
        return bcrypt.hashSync(userPassword, salt);
    },
    compare: (userPassword, userHashPassword) => {
        return bcrypt.compareSync(userPassword, userHashPassword)
    }
}