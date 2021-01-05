const { verifyToken } = require('../helpers/jwt');
const { User } = require('../models')

module.exports = {
    authenticate: (req, res, next) => {
        try {
            let decoded = verifyToken(req.headers.access_token);
            console.log(decoded);
        } catch (error) {
            console.log(error);
        }

    },
    authorize: (req, res, next) => {
        
    }
}   