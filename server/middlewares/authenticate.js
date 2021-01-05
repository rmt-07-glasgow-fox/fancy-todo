const {verifyToken} = require('../helpers/jwt')
const {User} = require('../models')

function authenticate(req, res, next){
    try {
        let decoded = verifyToken(req.headers.access_token)
        console.log(decoded)
        User.findOne({
            where : {
                email : decoded.email
            }
        })
        .then(user => {
            if(user){
                req.user = {
                    id : user.id
                }
                next()
            }
        })
        .catch(err => {
            res.status(500).json({message : 'Internal Server Error'})
        })
    } catch (err) {
        res.status(400).json({message : err.message})
    }
}

module.exports = {
    authenticate
}