const { User } = require('../models')
const { comparePass } = require('../helper/hash')
const { generateToken } = require('../helper/jwt')
const { OAuth2Client } = require('google-auth-library')

class UserController{
    static addNew(req,res){
        console.log('masuk sini');
        const {name, username, email, password, status} = req.body  
        console.log(name, username, email, password, status);
        User.create({name, username, email, password, status})
        .then(data => {
            res.status(201).json(data)
        })
        .catch(err => {
            console.log(err, 'ini error nya');
            res.status(400).json(err)
        })
    } 
    static login(req,res){
        console.log(req.body, '>>>>>>>>>>>');
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
    static async loginGoogle(req, res) {
        try {
            console.log(req.body)
            console.log('romi');
            const { id_token } = req.body
            const client = new OAuth2Client("390534079214-0jg8d3fsq59lrd1h0oo49jiunq75a9aa.apps.googleusercontent.com")
            const ticket = await client.verifyIdToken({
                idToken: id_token,
                audience: "390534079214-0jg8d3fsq59lrd1h0oo49jiunq75a9aa.apps.googleusercontent.com"
            });
            const payload = ticket.getPayload()
            const email = payload.email
            let password = "123456romi"
            let user = await User.findOne({ where: { email } })
            if (!user) {
                let newUser = {name:'Google User', username: 'Google User', email, password}
                let createUser = await User.create(newUser)
                const payload = {
                    id: createUser.id,
                    name: createUser.name,
                    username: createUser.username,
                    email: createUser.email
                }
                const access_token = generateToken(payload)
                return res.status(201).json({ access_token })
            }
            if (user) {
                const payload = {
                    id: user.id,
                    name: user.name,
                    username: user.username,
                    email: user.email
                }
                const access_token = generateToken(payload)
                return res.status(200).json({ access_token })
            }

        } catch (err) {
            console.log(err)
            return (err)
        }
    }
}

module.exports = UserController