const { User } = require('../models')
const { compare } = require('../helper/bcrypt')
const { generateToken } = require('../helper/jwt')
const { OAuth2Client } = require('google-auth-library');


class ControllerUser {

    static register(req,res,next){
        const obj = {
            firstname: req.body.firstname,
            lastname: req.body.lastname,
            email: req.body.email,
            password: req.body.password
        }
        User.create(obj)
        .then(data => {
            res.status(201).json({
                id: data.id,
                firstname: data.firstname,
                lastname: data.lastname,
                email: data.email
            })
        })
        .catch(error => {
            next(error)
        })
    }

    static googleLogin(req,res,next){
        const client = new OAuth2Client(process.env.GOOGLE_CLIENT_KEY);
        const id_token = req.body.id_token

        client.verifyIdToken({
            idToken: id_token,
            audience: process.env.GOOGLE_CLIENT_KEY
        })
        .then(ticket => {
            const payload = ticket.getPayload();
            const email = payload.email
            return User.findOne({where: {email: email}})
            .then(user => {
                if (user) {
                    return user
                } else {
                    const obj = {
                        firstname: payload.given_name,
                        lastname: payload.family_name,
                        email: email,
                        password: 'hehehehehe'
                    }
                    return User.create(obj)
                }
            })
            .then(user => {
                const access_token = generateToken({id: user.id, email:user.email})
                const first_name = user.firstname
                res.status(200).json({ access_token,first_name })
            })
            .catch(error => {
                console.log(error)
                next(error)
            })

        })
        .catch(error => {
            next(error)
        })
        
    }

    static login(req,res,next){
        User.findOne({where: {email: req.body.email}})
        .then(data => {
            if (data){
                if(compare(req.body.password,data.password)){
                    const access_token = generateToken({id: data.id, email:data.email})
                    const first_name = data.firstname
                    res.status(200).json({ access_token,first_name })
                } else {
                    throw {
                        status: 400,
                        message: "wrong email/password"
                    }
                } 
            } else {
                throw {
                    status: 400,
                    message: "wrong email/password"
                }
            }
        })
        .catch(error => {
            next(error)
        })
    }
}

module.exports = ControllerUser