const { checkToken } = require('../helpers/jwt')
const { User, Todo } = require('../models')

async function authentication(req, res, next) {
    // console.log('aunthen');
    try {
        // console.log(req.headers);
        let decoded = checkToken(req.headers.access_token)
        let find = await User.findOne({
            where: {email: decoded.email}
        })
        if (!find) {
            next({name: 'NotLogin', message: 'please login first'})
        } else {
            req.user = {
                id: find.id,
                username: find.username
            }
            next()
        }
    } catch (err) {
        next(err)
    }
}

async function authorization(req, res, next) {
    // console.log('author');
    try {
        let find = await Todo.findOne({
            where: {id: req.params.id}
        })
        if (!find) {
            return next({name: 'NotFound', message: 'data not found'})
        }
        if (find.UserId === req.user.id) {
            next()
        } else {
            next({name: 'NotOwn', message: 'not your own'})
        }
    } catch (err) {
        next(err)
    }
}

module.exports = {
    authentication,
    authorization
}