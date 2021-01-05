const jwt = require('jsonwebtoken')
const SECRET_KEY = "manchesterUnited"

class HelperJWT {
    static generateTokenJwt(payload) {
        const token = jwt.sign(payload, SECRET_KEY)
        return token
    }
}


module.exports = HelperJWT