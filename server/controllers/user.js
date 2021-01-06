const { User } = require("../models")
const { comparePassword } = require("../helpers/bcrypt")
const { generateToken } = require("../helpers/jwt")
const axios = require('axios')

class ControllerUser {
    static async signup(req, res, next){
        try {
            const {email, password} = req.body
            const user = await User.create({
                email, password
            })
            const result = {
                id: user.id,
                email: user.email
            }
            return res.status(201).json(result)
        } catch(err) {
            next(err)
        }
    }

    static async signin(req, res, next){
        try {
            const {email, password} = req.body
            const user = await User.findOne({
                where: {email}
            })
            if(!user){
                next({name: "Invalid Email/Password"})
                
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
                next({name: "Invalid Email/Password"})
            }
        } catch (err) {
            next(err)
        }
    }

    static weather(req, res){
        let urlWeather = `https://api.openweathermap.org/data/2.5/weather?id=1643084&appid=${process.env.WEATHER_API_KEY}`
        axios.get(urlWeather)
        .then((response) => {
            res.status(200).json(response.data)
        })
        .catch((error) => {
            next(err)
        })
    }
}

module.exports = ControllerUser