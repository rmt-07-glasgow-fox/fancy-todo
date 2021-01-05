const { User } = require('../models')
const { comparePassword } = require('../helpers/bcrypt')
const { generateToken } = require('../helpers/jwt')
class UserController {
    static signUp (req, res) {
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
            res.status(400).json(err)
        })
    }
   
    static async signIn (req, res) {
        try{
            const {email, password} = req.body
            const user = await User.findOne({
                where: {email}
            })
            if(!user) {
                 res.status(401).json({
                    message: "invalid email/password"
                })
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
                    res.status(401).json({
                        message: "invalid email/password"
                    })
                }
                // res.status(200).json(user)
            }
        }catch (err) { 
            res.status(401).json(err)
        }
    }
}

module.exports = UserController