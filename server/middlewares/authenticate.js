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
                    id : user.id
                }
                next()
            }
        })
        .catch(err => {
            res.status(500).json({message : 'Internal Server Error'})
        })
    } catch (err) {
        res.status(400).json({message : err.message})
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
            res.status(404).json({messsage: 'Error not found'})
        } else if(todo.userId === req.user.id){
            next()
        } else {
            res.status(401).json({message: 'Do not have access'})
        }
    })
    .catch(err => {
        res.status(500).json({message: 'Internal Server Error'})
    })
}

module.exports = {
    authenticate, authorization
}