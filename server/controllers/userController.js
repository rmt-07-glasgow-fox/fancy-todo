const {OAuth2Client} = require('google-auth-library');
const { User } = require('../models')
const { comparePassword } = require('../helpers/bcrypt')
const { generateToken } = require('../helpers/jwt')
class UserController {
    static signUp (req, res,next) {
        let {email, password, username} = req.body
        User.create({email,password,username})
        .then(data => {
            const response = {
                id: data.id,
                email: data.email,
                username: data.username
            }
            res.status(201).json(response)
        })
        .catch(err => {
            console.log(err)
            next({code:400, msg: err.message})
        })
    }
   
    static async signIn (req, res, next) {
        try{
            const {email, password} = req.body
            const user = await User.findOne({
                where: {email}
            })
            if(!user) {
                 return next({code: 401, origin: 'user'})
            } else {
                const match = comparePassword (password, user.password)
                if(match) {
                    const payload = {
                        id : user.id,
                        email: user.email,
                        username: user.username
                    }
                    const access_token = generateToken(payload)
                    res.status(200).json({access_token})
                } else {
                    return next({code: 401, origin: 'user'})
                }
                // res.status(200).json(user)
            }
        }catch (err) { 
            next({code: 500})
        }
    }
    static loginGoogle (req,res,next) {
        const { id_token } = req.body
        let email = null
        const client = new OAuth2Client(process.env.GOOGLE_CLIENT_ID);
        client.verifyIdToken({
          idToken: id_token,
          audience: process.env.GOOGLE_CLIENT_ID,
        })
        .then(ticket => {
          const payload = ticket.getPayload();
          email = payload.email
    
          return User.findOne({
            where: {
              email
            }
          })
        })
        .then(user => {
          if(!user) {
            return User.create({
              email,
              password: Math.random()*1000+'ini random',
              username:'client'
            })
          } else {
            return user
          }
        })
        .then(user => {
          const payload = {
            id: user.id,
            email: user.email
          }
          const access_token = generateToken(payload)
          return res.status(200).json({
            access_token
          })
        })
        .catch(err =>{
          next(err)
        })
        }
}

module.exports = UserController