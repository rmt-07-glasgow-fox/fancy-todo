const decode = require('../helper/webToken')
const {User,Todo} = require('../models')

function authentication(req,res,next) {
    try {
        const decoded = decode.decodeToken(req.headers.accesstoken)
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
    Todo.findOne({include:{model:User},where:{id:req.params.id}})
    .then(todo=>{
        const decoded = decode.decodeToken(req.headers.accesstoken)
        let idToken = decoded.id
        let idUser = todo.Users[0].id
        if (todo && idToken == idUser) {
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