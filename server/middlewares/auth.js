const { User, Todo } = require('../models')
const { checkToken } = require('../helpers/jwt')

async function authentication(req, res, next) {
    try {
        const decoded = checkToken(req.headers.access_token)
        const email = decoded.email
        let find = await User.findOne({where : {email}})
        if (find) {
            req.user = find
            next()
        } else {
            throw ({ name: "invalidAccessToken"})
        }
    } catch (err) {
        next(err)
    }
}

async function authorization(req, res, next) {
    try {
        let id = req.params.id
        let find = await Todo.findOne({ where: { id } })
        if (find && find.UserId !== req.user.id) {
            throw { name: "userIdNotMatch"}
        } else {
            next()
        }
    } catch (err) {
        next(err)
    }
}

module.exports = {
    authentication, 
    authorization
}