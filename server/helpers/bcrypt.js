const bcrypt = require('bcryptjs');

function hashPass (rawPass) {
    let salt = bcrypt.genSaltSync(10);
    let hash = bcrypt.hashSync(rawPass, salt);

    return hash;
}

function comparePass (rawPass, hash) {
    return bcrypt.compareSync(rawPass, hash);
}

module.exports = { hashPass, comparePass };