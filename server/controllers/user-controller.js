const { User } = require('../models')
const { comparePassword } = require('../helpers/bcryptjs')
const { generateToken } = require('../helpers/jwt')
const user = require('../models/user')

class UserController {
    static postRegisterHandler(req, res) {
        const { name, email, passoword } = req.body

        User.create(req.body)
            .then(data => {
                res.status(201).json(data)
            })
            .catch(err => {
                if(err.errors) {
                    err.errors.forEach(data => {                        
                        return res.status(400).json({message: data.message})    
                    })
                }
                res.status(500).json({message: "Internal server error"})
            })
    }

    static postLoginHandler(req, res) {
        const { email, password } = req.body

        User.findOne({where: {
            email
        }})
            .then(data => {
                if(data && comparePassword(password, data.password)) {
                    let payload = {
                        id: data.id,
                        email: data.email
                    }
                    const access_token = generateToken(payload)
                    res.status(200).json({
                        access_token
                    })
                } else {
                    res.status(401).json({message: "Invalid email/password"})
                }
                
            })
            .catch(err => {
                res.status(401).json({message: 'Internal server error'})
            })
    }
}

module.exports = UserController