const bcrypt = require('bcryptjs');

module.exports = {
    hashPassword: (userPassword) => {
        const salt = bcrypt.genSaltSync(10);

        return bcrypt.hashSync(userPassword, salt);
    },
    comparePassword: (password, hashPassword) => {
        return bcrypt.compareSync(password, hashPassword)
    }
}