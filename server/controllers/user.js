const { User } = require("../models")
const { comparePassword } = require("../helpers/bcrypt")
const { generateToken } = require("../helpers/jwt")
const axios = require('axios')
const {OAuth2Client} = require('google-auth-library');

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
            console.log("DIA MASUK ROUTING SIGNIN")
            const {email, password} = req.body
            const user = await User.findOne({
                where: {email}
            })
            console.log(user,">>>>>>>INI JAWABAN USER")
            if(!user){
                next({name: "Invalid Email/Password"})
                
            }
            const check = comparePassword(password, user.password)
            if(check){
                const payload = {
                    id:user.id,
                    email:user.email
                }
                const access_token = generateToken(payload)
                return res.status(200).json({access_token})
            } else {
                next({name: "Invalid Email/Password"})
            }
        } catch (err) {
            next(err)
        }
    }

    static async weather(req, res, next){
        try {
            let weatherApi = 'http://api.weatherstack.com/current?access_key=8aec2b3b55f3c908f515aa9b3c859a56&query=fetch:ip'
            let contentWeather = await axios.get(weatherApi)
            const apiDatas = {
                contentWeather: contentWeather.data
            }
            return res.status(200).json(apiDatas)
        } catch(err){
            next(err)
        }
    }

    static loginGoogle(req, res, next){
        const { id_token } = req.body
        
        const client = new OAuth2Client(process.env.GOOGLE_CLIENT_ID);
        async function verify() {
        const ticket = await client.verifyIdToken({
            idToken: id_token,
            audience: process.env.GOOGLE_CLIENT_ID,  // Specify the CLIENT_ID of the app that accesses the backend
            // Or, if multiple clients access the backend:
            //[CLIENT_ID_1, CLIENT_ID_2, CLIENT_ID_3]
        });
        const payload = ticket.getPayload();
        const userid = payload['sub'];
        // If request specified a G Suite domain:
  // const domain = payload['hd'];
}
verify().catch(console.error);


    }
}

module.exports = ControllerUser