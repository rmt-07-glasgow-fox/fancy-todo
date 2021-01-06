const { User } = require('../models')
const { comparePassword } = require('../helpers/bcryptjs')
const { generateToken } = require('../helpers/jsonwebtoken')

class UserController {
    static register(req, res, next) {
        let userObj = {
            fullName: req.body.fullName,
            email: req.body.email, 
            password: req.body.password
        }
        User.create(userObj)
            .then(data => {
                let result = {
                    id: data.id,
                    email: data.email
                }
                res.status(201).json(result)
            })
            .catch(err => {
                // res.send(err)
                // console.log(`INI ERRORNYA`, err)
                next(err)
            })
    }
    
    static login(req, res, next) {
        const { email, password } = req.body
        User.findOne({
            where: { email }
        }) 
            .then(data => {
                if (!data) {
                    next({ name: 'Invalid Input' })
                } else {
                    if (comparePassword(password, data.password)) { 
                        let payload = {
                            id: data.id,
                            fullName: data.fullName, 
                            email: data.email
                        }

                        let access_token = generateToken(payload)
                        res.status(200).json({ access_token })
                    } else {
                        next({ name: 'Invalid Input' })
                    }
                }
            })
            .catch(err => {
                // console.log(err)
                next(err)
            })
    }
}

module.exports = UserController