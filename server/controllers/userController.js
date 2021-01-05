const { compare } = require('../helper/bcrypt')
const {User} = require('../models')

class UserController {
    static register(req,res){
        let data = req.body
        User.create(data)
        .then(result=>{
            res.status(201).json(result)
        })
        .catch(err=>{
            res.status(500).json({message:err.message})
        })
    }
    static login(req,res){
        let data = req.body
        User.findOne({
            where:{
                email:data.email
            }
        })
        .then(result=>{
            if(!result){
                res.status(404).json({message:'Email/password salah'})
            }else{
                if(compare(req.body.password,result.password)){
                    res.status(200).json({message:'berhasil login'})
                }else{
                    res.status(404).json({message:'Email/password salah'})
                }
            }
        })
        .catch(err=>{
            res.status(500).json({message:err.message})
        })
    }
}

module.exports = UserController