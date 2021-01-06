const { verifyToken } = require('../helpers/jsonwebtoken')
const { User, Task } = require('../models')

function authenticate(req, res, next){
    try {
        let decoded = verifyToken(req.headers.access_token)
        // console.log(decoded)
        User.findOne({
            where: { email: decoded.email }  
        })
            .then(data => {
                if(!data) {
                    next({ name: 'Unauthorized' })
                } else {
                    req.user = data
                    next()
                }
            })
            .catch(err => {
                next(err)
                // res.status(500).json({ message: 'Internal Server Error' })
            })
    } catch (err) {
        next(err)
    }
}

function authorize(req, res, next) {
    let id = +req.params.id
    Task.findOne({
        where: { id }
    })
        .then(data => {
            if (!data || data.UserId !== req.user.id) {
                next({ name: 'Unauthorized' })
            } else {
                next()
            }
        })
        .catch(err => {
            // console.log('masuk sini auth')
            console.log(err)
            // err.name = 'Unauthorized'
            next(err)
        })
}

module.exports = {
    authenticate,
    authorize
}