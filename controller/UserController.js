const { user } = require('../models')
const {comparePassword} = require('../helpers/bcrypt')

class UserController{
    static register (req, res){
        const { email, password} = req.body
        user.create({
            email,
            password
        })
        .then (user => {
            const response = {
                id : user.id,
                email: user.email
        }
            return res.status(201).json(response)
        })
        .catch (err => {
            return res.status(400).json(user)
        })
    }

    static async login(req, res) {
        try {
            const { email, password } = req.body
            const user = await user.findOne({
                where: {
                    email : email
                }
            })
            if(!user){
                return res.status(401).json({
                    message: 'Invalid Email/Password'
                })
            }
            const match = comparePassword(password, user.password)
            if(match){
                const payload = {
                    id : user.id,
                    email: user.email
                }
                const access_token = generateToken(payload)
                return res.status(200).json({
                    access_token : access_token
                })
            } else {
                throw {
                    message : 'Invalid Email/Password'
                }
            }
            return res.status(200).json(user)
        }
        catch(err){
            return res.status(401).json(err)
        }
    }
}

module.exports = UserController