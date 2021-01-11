const {verifyToken} = require('../helpers/jwt')
const {User, Todo} = require('../models')

function authenticate(req, res, next){
    try {
        let decoded = verifyToken(req.headers.access_token)
        User.findOne({
            where : {
                email : decoded.email
            }
        })
        .then(user => {
            if(user){
                req.user = {
                    id : user.id,
                    email : user.email
                }
                next()
            }
        })
        .catch(err => {
            next(err)
        })
    } catch (err) {
        next(err)
    }
}

function authorization(req, res, next){
    Todo.findOne({
        where : {
            id : +req.params.id
        }
    })
    .then(todo => {
        if(todo === null){
            next({name : "Not found"})
        } else if(todo.userId === req.user.id){
            next()
        } else {
            next({name : 'Do not have access'})
        }
    })
    .catch(err => {
        next(err)
    })
}

module.exports = {
    authenticate, authorization
}