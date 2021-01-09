const bcrypt = require('bcryptjs');

const hashPassword = (password) => {
    const salt = bcrypt.genSaltSync(10);
    const hash = bcrypt.hashSync(password, salt);
    return hash
}

const comparePassword = (password, dbPassword) => {
    return bcrypt.compareSync(password, dbPassword);
}

module.exports = {
    hashPassword,
    comparePassword
}