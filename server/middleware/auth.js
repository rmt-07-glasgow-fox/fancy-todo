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
                    // return res.status(404).json({message:'User Not Found'})
                    next({name:'NotFound', message:'User Not Found'})
                }
                req.userData = decoded
                next()
            })
            .catch(next)
        }else{
            next({name:'Unauthorized', message:'Silahkan login dahulu'})
        }
    },
    authorize: (req,res,next)=>{
        let {id} = req.params
        Event.findByPk(id)
        .then(result=>{
            if(!result){
                next({name:'NotFound', message:'Event not found'})
            }else if(result.UserId != req.userData.id){
                next({name: 'Forbidden',message:`You don't have access` })
            }else{
                next()
            }
        })
        .catch(next)
    }
}