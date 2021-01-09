const {User} = require('../models')
const {Bcrypt} = require('../helper/bcrypt')
const {generateToken} = require('../helper/webToken')
const axios = require('axios').default

class UserController{
    static signUp(req,res,next){
        let user = {
            email: req.body.email,
            password: req.body.password
        }
        User.create(user)
        .then(data=>{
            res.status(200).json({id: data.id,email: data.email})
        })
        .catch(err=>{
            next(err)
        })
    }

    static signIn(req,res,next){
        let user = {
            email: req.body.email,
            password: req.body.password
        }

        User.findOne({where: {email: user.email}})
        .then(data=>{
            if (data) {
                if (Bcrypt.comparePassword(user.password,data.password)) {
                    const payload = {
                        id: data.id,
                        email: data.email
                    }
                    const accessToken = generateToken(payload)
                    res.status(200).json({accessToken: accessToken})
                } else {
                    next({name: 'unauthorized'})
                }
            } else {
                next({name: 'unauthorized'})
            }
        })
        .catch(err=>{
            next(err)
        })
    }

    static oAuth(req,res,next){
        let user = {
            email: req.body.email,
            password: req.body.password + 'qwerty123456789zxcvbnm'
        }

        User.findOne({where: {email: user.email}})
        .then(data=>{
            if (data) {
                if (Bcrypt.comparePassword(user.password,data.password)) {
                    const payload = {
                        id: data.id,
                        email: data.email
                    }
                    const accessToken = generateToken(payload)
                    res.status(200).json({accessToken: accessToken})
                } else {
                    next({name: 'unauthorized'})
                }
            } else {
                return User.create(user)
            }
        })
        .then(data=>{
            return User.findOne({where: {email: user.email}})
        })
        .then(data=>{
            if (data) {
                if (Bcrypt.comparePassword(user.password,data.password)) {
                    const payload = {
                        id: data.id,
                        email: data.email
                    }
                    const accessToken = generateToken(payload)
                    res.status(200).json({accessToken: accessToken})
                } else {
                    next({name: 'unauthorized'})
                }
            } else {
                next({name: 'unauthorized'})
            }
        })
        .catch(err=>{
            res.status(500)
        })
    }

    static getNews(req,res,next){
        const options = {
                method: 'GET',
                url: 'https://apidojo-yahoo-finance-v1.p.rapidapi.com/news/list',
                params: {category: 'generalnews', region: 'US'},
                headers: {
                'x-rapidapi-key': 'dfbdd7fbd9mshe00a75467674f9bp1c5c61jsn4b416ce1a4fb',
                'x-rapidapi-host': 'apidojo-yahoo-finance-v1.p.rapidapi.com'
                }
            };
            
        axios.request(options)
        .then(response=>{
        console.log(response.data.items.result)
            res.status(200).json(response.data.items.result)
        }).catch(err=>{
          res.status(500).json(err)
        });
    }
}

module.exports = UserController