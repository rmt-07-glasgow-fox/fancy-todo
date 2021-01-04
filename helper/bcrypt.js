const bcrypt = require('bcryptjs');

 class Bcrypt {
    static hash(password){
        const salt = bcrypt.genSaltSync(10);
        const hash = bcrypt.hashSync(password, salt);
        return hash
    }

    static comparePassword(password,hashPassword){
        return bcrypt.compareSync(password, hashPassword);
    }
 }

 module.exports = {Bcrypt}