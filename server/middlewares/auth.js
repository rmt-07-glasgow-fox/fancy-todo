const { verifyToken } = require('../helpers/jwt');
// const { User } = require('../models')

module.exports = {
    authenticate: (req, res, next) => {
        try {
            let decode = verifyToken()
        } catch (err) {

        }
    },
    authorize: (req, res, next) => {
        
    }
}   