const {User} = require('../models')
const { checkPassword } = require('../helpers/bcrypt')
const { createToken } = require('../helpers/jwt')
const axios = require('axios')


class userController {
    static register(req, res, next){
        const newUser = {
            email: req.body.email,
            password: req.body.password
        }
        User.create(newUser)
        .then(data => {
            res.status(201).json({
                id : data.id,
                email : data.email
            })
        })
        .catch(err => {
            // if(err.errors){
                // let message = []
                // err.errors.forEach(el => {
                //     message.push(el.message)
                // })
                // res.status(400).json({
                //     Errors : message
                // })
            // } else {
            //     res.status(500).json({message: 'Internal Server Error'})
            // }
            next(err)
        })
    }

    static login(req, res){
        let url = "https://api.weatherbit.io/v2.0/current?city=Jakarta,ID&key=46da47a5a04743feb6f7e71d297a5590"
        const { email, password } = req.body
        let loginUser = ''
        User.findOne({
            where : {
                email : email
            }
        })
        .then(user => {
            if(user){
                if(checkPassword(password, user.password)){
                    loginUser = user
                    return axios.get(url)
                } else {
                    res.status(400).json({message : 'Incorect Email / Password'})
                }
            } else {
                res.status(400).json({message : 'Incorect Email / Password'})
            }   
        })
        .then(weather => {
            console.log(weather.data)
            const payload = {
                id : loginUser.id,
                email : loginUser.email
            }
            const access_token = createToken(payload)
            res.status(200).json({access_token})
        })
        .catch(err => {
            res.status(500).json({message : 'Internal Server Error'})
        })
    }
}


module.exports = userController 