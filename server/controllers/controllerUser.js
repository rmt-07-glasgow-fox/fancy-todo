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
        
        async function verify() {
            const ticket = await client.verifyIdToken({
                idToken: id_token,
                audience: process.env.GOOGLE_CLIENT_KEY
            })
            .then(ticket => {
                const payload = ticket.getPayload();
                console.log(payload)
            })
            .catch(error => {
                next(error)
            })
        }
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