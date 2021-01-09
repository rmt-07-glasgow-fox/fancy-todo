const bcrypt = require('bcryptjs')

function comparePass(pass, dbPass){
    return bcrypt.compareSync(pass, dbPass)
}

module.exports = comparePass