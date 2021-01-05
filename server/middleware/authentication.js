const { verifyToken } = require('../helper/jwt')

const { User } = require('../models')

function authentication(req, res, next) {
    const { access_token } = req.headers
    
    if(!access_token) {
        res.status(401).json({message : 'Please Login First'})
    } else {
        const decoded = verifyToken(access_token)

        req.loggedInUser = decoded

        User.findOne({where : 
            { id : decoded.id }
        })
        .then(user => {
            next()
        })
        .catch(err => {
            res.status(401).json({
                message : 'Please Login FIrst'
            })
        })
    }
}

module.exports = {
    authentication
}