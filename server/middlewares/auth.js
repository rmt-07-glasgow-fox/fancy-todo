const { checkToken } = require('../helpers/jwt')
const { User } = require('../models')

function authentication(req, res, next) {
    try {
        let decoded = checkToken(req.headers.access_token)
        console.log(decoded)
        let find = User.findOne({where: { email: decoded.email}})
        // res.send(find)
        if(!find) {
            res.status(401).json({message: "Please login first"})
        } else {
            req.user = find
            next()
        }
    }
    catch (err) {
        res.status(500).json({message: "Internal Server Error"})
    }
    // next()
}

module.exports = {
    authentication
}