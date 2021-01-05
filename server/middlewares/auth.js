const { checkToken } = require('../helpers/jwt')
const { User, Todo } = require('../models/index')
const router = require('../routes')

async function authenticate(req, res, next) {
    //cektoken
    try{
        let decoded = checkToken(req.headers.access_token)

        let find = await User.findOne({
            where: {
                email: decoded.email
            }
        })

        if(!find){
            return res.status(401).json({
                message: 'Please login first'
            })
        }else{
            req.user = find
            next()
        }
        
    }catch(err){
        return res.status(400).json({
            message: err.message
        })
    }
} 

async function authorize(req, res, next){
    try {
        const result = await Todo.findOne({
            where: {
                id: req.params.id
            }
        })

        if(!result || result.userId !== req.user.id){
            res.status(401).json({
                message: "you don't have permission to delete this data"
            })
        }else{
            next()
        }
    } catch (error) {
        res.status(500).json({message: err.message})
    }
}

module.exports = {
    authenticate,
    authorize
}