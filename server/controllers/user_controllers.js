const { User } = require('../models')
const { OAuth2Client } = require('google-auth-library')
const { comparePass } = require('../helpers/bcrypt')
const { generateToken } = require('../helpers/jwt')

class UserController {
    static register(req, res, next) {
        const { email, password } = req.body
        let obj = {
            email,
            password
        }
        User.create(obj)
        .then(user => {
            let obj = {
                id: user.id,
                email: user.email
            }
            res.status(201).json(obj)
        })
        .catch(err => {
            // console.log(err)
            next(err)
        })
    }

    static async login(req, res, next) {
        try {
            const { email, password } = req.body
    
            const user = await User.findOne({
                where: {
                    email
                }
            })
            if (!user) {
                next({message: 'Invalid Email / Password'})
            }
            const isValidPass = comparePass(password, user.password)
            if (isValidPass) {
                const payload = {
                    id: user.id,
                    email: user.email
                }
                const access_token = generateToken(payload)
                return res.status(200).json({ access_token })
            } else {
                next({message: 'Invalid Email / Password'})
            }
        } catch (err) {
            next({message: 'Internal Server Error'})
        }
    }

    static googleLogin(req, res, next){
        console.log('masuk googleligin di server')
        const { id_token } = req.body
        let email
        const client = new OAuth2Client(process.env.GOOGLE_CLIENT_ID);
        client.verifyIdToken({
          idToken: id_token,
          audience: process.env.GOOGLE_CLIENT_ID
        })
          .then(data => {
            const payload = data.getPayload()
            email = payload.email
            return User.findOne({
              where:{
                email
              }
            })
          })  
          .then(user => {
            if (!user) {
              return User.create({
                email,
                password: (Math.random()*1000000).toString()
              })
            } else {
              return user
            }
          })
          .then(data => {
            let access_token = generateToken({
              id: data.id,
              email: data.email
            })
            res.status(200).json({
              access_token,
              data
            })
          })
          .catch(err => {
            next(err)
          })
      }
}

module.exports = { UserController }