const { User } = require('../models')
const { comparePass } = require('../helpers/bcrypt')
const { generateToken } = require('../helpers/jwt')

class UserController {
    static register(req, res) {
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
            res.status(200).json(obj)
        })
        .catch(err => {
            console.log(err)
            res.status(400).json({err})
        })
    }

    static async login(req, res) {
        try {
            const { email, password } = req.body
    
            const user = await User.findOne({
                where: {
                    email
                }
            })
            if (!user) {
                return res.status(401).json({message: 'Invalid Email / Password'})
            }
            const isValidPass = comparePass(password, user.password)
            if (isValidPass) {
                const payload = {
                    id: user.id,
                    email: user.email
                }
                const accessToken = generateToken(payload)
                return res.status(200).json({ accessToken })
            } else {
                return res.status(401).json({message: 'Invalid Email / Password'})
            }
        } catch (err) {

        }
    }
}

module.exports = { UserController }