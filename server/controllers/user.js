const { User } = require('../models/index')
const { comparePassword } = require('../helper/bcrypt')
const { generateToken } = require('../helper/jwt')

class ControllerUser {
    static register (req, res, next) {
        let obj = {
            email: req.body.email,
            password: req.body.password
        }
        console.log(obj);
        User.create(obj)
        .then(user => {
            const response = {
                id: user.id,
                email: user.email
            }
            res.status(200).json(response)
        })
        .catch(err => {
                next(err)
        })
    }
    static async login (req, res, next) {
        try {
            const obj = {
                email: req.body.email,
                password: req.body.password
            }
            const user = await User.findOne({
                where: { 
                    email: obj.email 
                }
            })
            if (!user) {
                return next({
                    name: "invalid email / password" 
                })
            }
            const match = comparePassword(obj.password, user.password)
            if (match) {
                //jwt
                // console.log(match);
                const payload = {
                    id: user.id,
                    email: user.email
                }
                const access_token = generateToken(payload)
                return res.status(200).json({
                    access_token: access_token
                })
            } else {
                return next({
                    name: "invalid email / password" 
                })
            }

        } catch (error) {
            console.log(error);
            return next(error)
        }
    }
}

module.exports = ControllerUser