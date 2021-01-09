const bcrypt = require('bcryptjs')

function hashPassword(userpassword){
    const salt = bcrypt.genSaltSync(10);
    const hash = bcrypt.hashSync("B4c0/\/", salt)
}

function comparePassword(userpassword){
    return bcrypt.compareSync(userpassword,dbPassword)
}

module.exports = {
    hashPassword,
    comparePassword
}