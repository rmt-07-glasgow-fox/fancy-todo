const { compare } = require('../helper/bcrypt')
const { generateToken } = require('../helper/jwt')
const {User} = require('../models')

class UserController {
    static register(req,res,next){
        let data = req.body
        User.create(data)
        .then(result=>{
            res.status(201).json(result)
        })
        .catch(next)
    }
    static login(req,res,next){
        let data = req.body
        User.findOne({
            where:{
                email:data.email
            }
        })
        .then(result=>{
            if(!result){
                    next({name:'NotFound', message:'Email atau Password salah'})
            }else{
                if(compare(data.password,result.password)){
                    let payload = {
                        id: result.id,
                        email: data.email
                    }
                    let access_token = generateToken(payload)
                    res.status(200).json({message:'berhasil login', access_token})
                }else{
                    next({name:'NotFound', message:'Email atau Password salah'})
                }
            }
        })
        .catch(next)
    }
}

module.exports = UserController