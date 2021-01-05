const bcrypt = require('bcryptjs')


function hash(password) {
    return bcrypt.hashSync(password,process.env.SALT)
}

function compare(password, hashed) {
    return bcrypt.compareSync(password,hashed)
}

module.exports = {
    hash, compare
}