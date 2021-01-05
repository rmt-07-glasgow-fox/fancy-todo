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
            res.status(401).json({message: 'You need to login first'})
        }
    } catch(err) {
        res.status(400).json({message: err.message})
    }
}

const authorize = async (req,res,next) => {
    const { id } = req.params
    try{
        let todo = await Todo.findOne({where:{id}})

        if(!todo || todo.UserId != req.user.id){
            res.status(401).json({ message: 'you dont have access' })
        }else{
            next()
        }
    }catch(err){
        res.status(500).json({ message: err.message })
    }
}

module.exports = {
    authenticate,
    authorize
}