const {User} = require('../models')
const comparePassword = require('../helper/comparePass')
const generateToken = require('../helper/jwt')

class Controller{
    static register(req, res){
        let body = req.body
        let data = {
            email: body.email,
            password: body.password
        }
        User.create(data)
        .then(data=>{
            res.status(200).json({id:data.id, email:data.email})
        })
        .catch(err=>{
            res.status(400).json({message: err})
        })
    }
    static login(req, res){
        let body = req.body
        let dataUser = {
            email: body.email,
            password: body.password
        }
        User.findOne({where:{email:dataUser.email}})
        .then(data=>{
            if(!data){
                res.status(401).json({message: 'Email/Password incorrect'})
            }else{
                let match = comparePassword(dataUser.password, data.password)
                if(match){
                    let payload = {id: data.id, email:data.email}
                    let access_token = generateToken(payload)
                    return res.status(200).json({access_token})
                }else{
                    res.status(401).json({message: 'Email/Password incorrect'})
                }
            }
        })
        .catch(err=>{
            res.status(400).json(err)
            console.log(err)
        })
    }
}

module.exports = Controller