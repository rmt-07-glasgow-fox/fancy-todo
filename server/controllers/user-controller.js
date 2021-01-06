const { User } = require('../models')
const { comparePassword } = require('../helpers/bcryptjs')
const { generateToken } = require('../helpers/jwt')
const user = require('../models/user')
const axios = require('axios')
const { response } = require('express')

class UserController {
    static postRegisterHandler(req, res, next) {
        const { name, email, password } = req.body

        User.create(req.body)
            .then(data => {
                res.status(201).json(data)
            })
            .catch(err => {
                next(err)
            })
    }

    static postLoginHandler(req, res, next) {
        const { email, password } = req.body

        User.findOne({where: {
            email
        }})
            .then(data => {
                // console.log(data)
                if(data && comparePassword(password, data.password)) {
                    // console.log('ok')
                    let payload = {
                        id: data.id,
                        email: data.email
                    }
                    console.log(payload)
                    const access_token = generateToken(payload)
                    // console.log(access_token)
                    res.status(200).json({
                        access_token
                    })
                } else {
                    next({name: "invalid"})
                    // res.status(401).json({message: "Invalid email/password"})
                }
                
            })
            .catch(err => {
                next(err)
            })
    }

    static userHandler(req,res) {

        axios.get("http://api.openweathermap.org/data/2.5/weather?q=London&appid=498411ae61c0536b808a80020b14287a")
            .then(response => {
                console.log(response)
                res.send(response)
            })
            .catch(err => {
                res.send(err)
            })
    }
}

module.exports = UserController