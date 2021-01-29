const jwt = require('jsonwebtoken');
class Token {
    static getToken(obj) {
        return jwt.sign(obj, process.env.SECRET); //output string token
    }

    static verifyToken(token) {
        
        try {
            let verified = jwt.verify(token, process.env.SECRET); //output object
            return verified
        } catch(err) {
            // err
            throw {
                status: 401,
                message: `Please Login First`
            }
        }
    }
}


module.exports = Token