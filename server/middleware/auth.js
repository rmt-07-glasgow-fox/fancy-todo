const { decode } = require("../helper/jwt")
const { User,Event } = require('../models')
module.exports = {
    authenticate: (req,res,next)=>{
        const {access_token} = req.headers
        if(access_token){
            let decoded = decode(access_token)
            User.findByPk(decoded.id)
            .then(result=>{
                if(!result){
                    return res.status(404).json({message:'User Not Found'})
                }
                req.userData = decoded
                next()
            })
            .catch(err=>{
                res.status(500).json({message:err.message})
            })
        }else{
            res.status(500).json({message:`You're Authenticated`})
        }
    },
    authorize: (req,res,next)=>{
        let {id} = req.params
        Event.findByPk(id)
        .then(result=>{
            if(!result){
                return res.status(404).json({message:'Event Not Found'})
            }else if(result.UserId != req.userData.id){
                return res.status(403).json({message:`You don't have access`})
            }else{
                next()
            }
        })
        .catch(err=>{
            res.status(500).json({message:err.message})
        })
    }
}