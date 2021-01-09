const { checkToken } = require('../helpers/jwt')
const { user } = require('../models')

function authenticate(req, res, next){
    try{
        let decoded = checkToken.verify(req.headers.access_token)
        console.log(decoded)
        user.findOne({ where: { email: decoded.email}})
        .then(find => {
            if(!find){
            res.status(401).json({ message: 'Please login first' })
        } else {
            req.user = {
                id : find.id
            }
           next() 
        }
    })
        .catch(err => {
            res.status(500).json({ message: err.message})
        })
    } 
    catch(err) {
        res.status(400).json({ message: err.message })
    }
}

module.exports = {authenticate}