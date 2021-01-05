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
                console.log(data);
                req.userData = {
                    id: data.id,
                    username: data.username,
                    email: data.email
                }
                next()
            } else {
                res.status(401).json({message: "Please login first"})
            }
        })
        .catch(err => {
            res.status(500).json(err.message)
        })
    } catch (err) {
        res.status(400).json(err.message)
    }
}

function authorized(req, res, next){
    const todoId = req.params.id
    const userId = req.userData.id
    Todo.findByPk(todoId)
    .then(data => {
        if(data.UserId == userId){
            next()
        } else {
            res.status(401).json({message: "User not autorized"})
        }
    })
    .catch(err => {
        res.status(500).json(err.message)
    })
}

module.exports = { authenticate, authorized }