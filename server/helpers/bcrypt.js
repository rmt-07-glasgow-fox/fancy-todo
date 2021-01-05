const bcrypt = require('bcryptjs');

function hashPassword(password){
    const salt = bcrypt.genSaltSync(10);
    const hash = bcrypt.hashSync(password, salt);
    return hash
}

function unhashPassword(password, hashedPassword){
    bcrypt.compareSync(password, hashedPassword); 
}

module.exports = { hashPassword, unhashPassword }