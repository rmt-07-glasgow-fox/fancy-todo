const { checkToken } = require('../helpers/jwt')
const { User } = require('../models')

async function authentication(req, res, next) {
    try {
        // console.log(req.headers);
        let decoded = checkToken(req.headers.access_token)
        let find = await User.findOne({
            where: {email: decoded.email}
        })
        if (!find) {
            res.status(401).json({message: 'please login first'})
        } else {
            req.user = {
                id: find.id,
                username: find.username
            }
            // console.log(req.user);
            next()
        }
    } catch (err) {
        res.status(400).json({message: err.message})
    }
}

async function authorization(req, res, next) {

}

module.exports = {
    authentication,
    authorization
}