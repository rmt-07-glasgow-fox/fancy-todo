const { User } = require('../models')
const { comparePassword } = require('../helpers/bcrypt')
const { generateToken } = require('../helpers/jwt')
class UserController {
    static signUp (req, res,next) {
        let {email, password, username} = req.body
        User.create({email,password,username})
        .then(data => {
            const response = {
                id: user.id,
                email: user.email,
                username: user.username
            }
            res.status(201).json(response)
        })
        .catch(err => {
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
}

module.exports = UserController