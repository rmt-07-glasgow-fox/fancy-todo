const { User } = require("../models")
const { comparePassword } = require("../helpers/bcrypt")
const { generateToken } = require("../helpers/jwt")

class ControllerAuth {
    static async signup(req, res){
        try {
            const {email, password} = req.body
            const user = await User.create({
                email, password
            })
            const result = {
                email: user.email
            }
            return res.status(201).json(result)
        } catch(err) {
            return res.status(400).json(err)
        }
    }

    static async signin(req, res){
        try {
            const {email, password} = req.body
            const user = await User.findOne({
                where: {email}
            })
            if(!user){
                return res.status(401).json({
                    message: "invalid email/password"
                })
            }
            const check = comparePassword(password, user.password)
            if(check){
                const payload = {
                    id:user.id,
                    email:user.email
                }
                const acess_token = generateToken(payload)
                return res.status(200).json({acess_token})
            } else {
                return res.status(401).json({
                    message: "invalid email/password"
                })
            }
        } catch (err) {
            return res.status(401).json(err)
        }
    }
}

module.exports = ControllerAuth