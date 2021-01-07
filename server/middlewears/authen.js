const {decodeToken} = require('../helpers/jwt')
const {User} = require('../models')

module.exports = (req, res, next) => {
    try {
        let access_token = req.headers.access_token
        if(!access_token){
            throw {
                status: 400,
                message: 'Please Log In'
            }
        } else {
            let decode = decodeToken(access_token)
            if(!decode){
                throw {
                    status: 404,
                    message: 'Invalid user'
                }
            } else {
                req.user = decode
                const findUser = User.findByPk(decode.id)
                if (!findUser) {
                    throw {
                        status: 404,
                        message: 'Invalid user'
                    }
                } else {
                    next ()
                }
            }
        }
    } catch (err) {
        next(err)
    }
}