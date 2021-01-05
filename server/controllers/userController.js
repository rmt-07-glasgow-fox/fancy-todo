const { User } = require ("../models")
const { checkPassword } = require ("../helpers/bcrypt")
const { getToken } = require ("../helpers/jwt")


class UserController {

    static register (req, res) {

        const { email, password } = req.body

        User.create ({ email, password })
        .then (result => {
            const output = {
                id: result.id,
                email: result.email
            }
            return res.status (201).json (output)
        })
        .catch (err => {
            return res.status (400).json (err.errors[0].message)
        })
    }

    static login (req, res) {

        const { email, password } = req.body

        User.findOne ({
            where: {
                email
            }
        })
        .then (result => {
            if (!result) {
                return res.status (401).json ({ message: "Invalid Email / Password" })
            }

            const isMatch = checkPassword (password, result.password)

            if (isMatch) {
                const payload = {
                    id : result.id,
                    email : result.email
                }

                const access_token = getToken (payload)
                
                return res.status (200).json ({
                    access_token
                })

            } else {
                return res.status (401).json ({ message: "Invalid Email / Password" })
            }

            
        })
        .catch (err => {
            return res.status (400).json (err.errors[0].message)
        })
        
    }
}

module.exports = UserController