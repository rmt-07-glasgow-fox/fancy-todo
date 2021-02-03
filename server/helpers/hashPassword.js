const bcyrpt = require('bcryptjs');

function hashPassword(password) {
    let salt = bcyrpt.genSaltSync(10)
    return bcyrpt.hashSync(password, salt)
};

function compare(password, hashPassword) {
    return bcyrpt.compareSync(password, hashPassword)
}

module.exports = {
    hashPassword,
    compare
}