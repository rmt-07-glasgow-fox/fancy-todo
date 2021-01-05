const { User } = require('../models')
const { compare } = require('../helpers/hashPassword')
const { generateToken } = require('../helpers/jwt')

class Controller {
    static register(req, res) {
        const { email, password } = req.body
        User.create({
            email, password
        })
        .then(data => {
            let { id, email } = data
            res.status(201).json({id, email})
        })
        .catch(err => {
            let msg = []
            err.errors.forEach(el => {
                msg.push(el.message);
            });
            res.status(400).json({message: msg})
        })
    }

    static async login(req, res) {
        try {
            const{ email, password } = req.body
            const user = await User.findOne({
                where: {
                    email
                }
            })
            if (!user) {
                return res.status(400).json({message: "Invalid email / password"})
            }
            const match = compare(password, user.password)
            if (match) {
                const payload = {
                    id: user.id,
                    email: user.email
                }
                const access_token = generateToken(payload)
                return res.status(200).json({access_token})
            } else {
                return res.status(400).json({message: "Invalid email / password"})
            }
        } catch (err) {
            res.status(500).json({message: "internal server error"})
        }
    }
}

module.exports = Controller