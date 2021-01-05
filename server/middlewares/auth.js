const { tokenCheck } = require("../helpers/jwt")
const { User, Todo } = require("../models")

async function authenticate(req, res, next){
    try{
        let decoded = tokenCheck(req.headers.access_token)
        let find = await User.findOne({
            where: {
                email: decoded.email
            }
        })
        if(!find){
            res.status(400).json({message:"Please Sign In First"})
        } else {
            req.user = find
            next()
        }
    } catch (err) {
        res.status(500).json({message: err.message})
    }
}

async function authorize(req, res, next){
    try{
        let find = await Todo.findOne({
            where: {
                id: +req.params.id
            }
        })
        if(!find || ßfind.user_id !== req.user.id){
            res.status(401).json({message:"You don't Have Access"})
        } else {
            next()
        }
    } catch (err) {
        res.status(500).json({message: err.message})
    }
}

module.exports = { authenticate, authorize }