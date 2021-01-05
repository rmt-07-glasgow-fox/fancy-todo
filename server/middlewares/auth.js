const { cekToken } = require('../helpers/jwt')
const { User, Todo } = require('../models')

const authenticate = async (req,res,next) => {
    try{
        let decode = cekToken(req.headers.access_token)
        let user = await User.findOne({
            where: {email:decode.email}
        })
        if(user){
            req.user = user
            next()
        } else {
            next({name: "errorAuthentication"})
        }
    } catch(err) {
        next(err)
    }
}

const authorize = async (req,res,next) => {
    const { id } = req.params
    try{
        let todo = await Todo.findOne({where:{id}})
        if(!todo){
            next({ name: "errorNotFound" })
        }else{
            if(todo.UserId != req.user.id){
                next({ name: "errorAuthorization" })
            }else{
                next()
            }
        }
    }catch(err){
        next(err)
    }
}

module.exports = {
    authenticate,
    authorize
}