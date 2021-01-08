const { User } = require('../models')
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
            res.status(200).json(obj)
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
}

module.exports = { UserController }