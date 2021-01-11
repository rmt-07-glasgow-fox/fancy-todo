const { User, Todo } = require('../models')
const { checkToken } = require('../helpers')

function authenticate(req, res, next){
    try {
        let decode = checkToken(req.headers.access_token)
        User.findOne({
            where: {
                email: decode.email
            }
        })
        .then(data => {
            if (data){
                req.userData = {
                    id: data.id,
                    username: data.username,
                    email: data.email
                }
                next()
            } else {
                next({status: 401})
            }
        })
        .catch(err => {
            next(err)
        })
    } catch (err) {
        next({status: 400})
    }
}

function authorized(req, res, next){
    const todoId = req.params.id
    const userId = req.userData.id
    Todo.findByPk(todoId)
    .then(data => {
        if (data){
            if(data.UserId == userId){
                next()
            } else {
                next({status: 401})
            }
        } else {
            next({status: 404})
        }
    })
    .catch(err => {
        next(err)
    })
}

module.exports = { authenticate, authorized }