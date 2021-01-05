const { User } = require("../models")
const { comparePassword } = require("../helpers/bcrypt")
const { generateToken } = require("../helpers/jwt")
const axios = require('axios')

class ControllerUser {
    static async signup(req, res){
        try {
            const {email, password} = req.body
            const user = await User.create({
                email, password
            })
            const result = {
                email: user.email
            }
            return res.status(201).json(result)
        } catch(err) {
            return res.status(400).json(err)
        }
    }

    static async signin(req, res){
        try {
            const {email, password} = req.body
            const user = await User.findOne({
                where: {email}
            })
            if(!user){
                return res.status(401).json({
                    message: "invalid email/password"
                })
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
                return res.status(401).json({
                    message: "invalid email/password"
                })
            }
        } catch (err) {
            return res.status(401).json(err)
        }
    }

    static weather(req, res){
        let urlWeather = "https://api.openweathermap.org/data/2.5/weather?id=1643084&appid=49ecf64121971fb566f9f10613213c13"
        axios.get(urlWeather)
        .then((response) => {
            res.status(200).json(response.data)
        })
        .catch((error) => {
            res.status(400).json({message:"Weather Are Unavailable"})
        })
    }
}

module.exports = ControllerUser