const {User} = require('../models')
const {verifyPassword} = require('../helpers/bcrypt')
const {generateToken} = require('../helpers/jwt')
const {OAuth2Client} = require('google-auth-library')
const client = new OAuth2Client(process.env.GOOGLE_CLIENT_ID)

class UserController {
    static async register (req, res, next) {
        try {
            let body = {
                email: req.body.email,
                password: req.body.password
            }
            const created = await User.create(body)
            res.status(201).json({id: created.id, email: created.email})
        } catch (err) {
            next(err)
        }
    }

    static async login (req, res, next) {
        try {
            let body = {
                email: req.body.email,
                password: req.body.password
            }
            const find = await User.findOne({where: {email: body.email}})
            if(!find){
                throw {
                    status: 400,
                    message: "Email/Password Invalid"
                }
            } else {
                if(verifyPassword(body.password, find.password) == true){
                    let access_token = generateToken({id: find.id, email: find.email})
                    res.status(200).json({access_token})
                } else {
                    throw {
                        status: 400,
                        message: "Email/Password Invalid"
                    }
                }
            }
        } catch (err) {
            next(err)
        }   
    }

    static async loginGoogle(req, res, next) {
        try {
            const ticket = await client.verifyIdToken({
                idToken: req.body.tokenGoogle,
                audience: process.env.GOOGLE_CLIENT_ID,
            })
            const payload = ticket.getPayload()
            const findUser = await User.findOne({where :
                {email : payload.email}
            })
            if(findUser){
                let access_token =  generateToken({id : findUser.id, email : findUser.email})
                res.status(200).json({access_token})
            } else {
                const newUser = await User.create({
                    email : payload.email,
                    password : process.env.SECRET
                })
                let dataShow = { id : newUser.id, email : newUser.email}
                let access_token = generateToken(dataShow)
                res.status(201).json({access_token})
            }
        } catch (err) {
            next(err)
        }   
    }
}

module.exports = UserController