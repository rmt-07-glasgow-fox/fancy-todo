const { User } = require ("../models")
const { checkPassword } = require ("../helpers/bcrypt")
const { getToken } = require ("../helpers/jwt")


class UserController {

    static register (req, res, next) {

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
            next (err)
        })
    }

    static login (req, res, next) {

        const { email, password } = req.body

        User.findOne ({
            where: {
                email
            }
        })
        .then (result => {
            if (!result) {
                next ({ name: "Unauthorized", message: "Invalid Email / Password" })
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
                next ({ name: "Unauthorized", message: "Invalid Email / Password" })
            }
            
        })
        .catch (err => {
            next (err)
        })
        
    }
}

module.exports = UserController