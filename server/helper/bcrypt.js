const bcrypt = require('bcryptjs')
const salt = bcrypt.genSaltSync(10)

function hash(password){
    return bcrypt.hashSync(password,salt)
}

function compare(password,hashed){
    return bcrypt.compareSync(password,hashed)
}

module.exports = {
    hash,
    compare
}