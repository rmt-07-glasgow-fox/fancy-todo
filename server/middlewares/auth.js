const {checkToken} = require('../helpers/jwt')
const {User} = require('../models')

const authenticate = async (req, res, next) => {
    try {
        const decoded = await checkToken(req.headers.accesstoken)
        console.log(decoded)
        const find = await User.findOne({
            where: {
                email: decoded.email
            }
        })

        if (!find) {
            res.status(401).json({
                message: "Please register first!"
            })
        }
        else {
            req.user = {
                id: find.id
            }
            next()
        }
    }
    catch (err) {
        res.status(400).json({
            message: err.message
        })
    }
}

module.exports = authenticate

