const { User } = require('../models')
const { comparePass } = require('../helper/hash')
const { generateToken } = require('../helper/jwt')

class UserController{
    static addNew(req,res){
        const {name, username, email, password, status} = req.body  
        console.log(req.body.name);
        User.create({name, username, email, password, status})
        .then(data => {
            res.status(201).json(data)
        })
        .catch(err => {
            res.status(400).json(err)
        })
    } 
    static login(req,res){
        const {email,password} = req.body
        User.findOne({
            where:{
                email:email
            }
        })
        .then(data => {
            if (!data) {
                res.status(401).json({
                    msg: 'Invalid Email/Password'
                })
            } 
            if (comparePass(password, data.password)) {
                const payload = {
                    id: data.id,
                    name: data.name,
                    username: data.username,
                    email: data.email
                }
                const access_token = generateToken(payload)
                return res.status(200).json({
                    access_token : access_token
                })
            } else {
                throw{
                    msg: 'Invalid Email/Password'
                }
            }
        })
        .catch(err => {
            res.status(401).json(err)
        })
    }
}

module.exports = UserController