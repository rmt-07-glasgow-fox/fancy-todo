const decode = require('../helper/webToken')
const {User,Todo} = require('../models')

function authentication(req,res,next) {
    try {
        const decoded = decode.decodeToken(req.headers.token)
        User.findOne({where:{id:decoded.id}})
        .then(data=>{
            if (data) {
                req.user = {
                    id: data.id
                }
                next()
            } else {
                next(err = {name: 'notFound'})
            }
        })
        .catch(err=>{
            next(err)
        })
    } catch (err) {
        next(err)
    }
}

function authorization(req,res,next) {
    Todo.findOne({where:{id:req.params.id}})
    .then(todo=>{
        if (todo && todo.UserId == req.user.id) {
            next()
        } else {
            next(err = {name: 'notFound'})
        }
    })
    .catch(err=>{
        next(err)
    })
}

module.exports = {
    authentication,
    authorization
}