const { comparePass } = require('../helpers/bcrypt');
const { User } = require('../models');
const { generateToken } = require('../helpers/jwt');
const { OAuth2Client } = require('google-auth-library')

class UserController {

    static registerPost = (req, res, next) => {
        const { email, name, password } = req.body;
        User.create({email, name, password })
        .then(output => res.status(201).json({id: output.id, email: output.email}))
        .catch(err => next(err));
    }
    
    static loginPost = (req, res, next) => {
        const { email, password } = req.body;
        User.findOne({where: {email}})
        .then(output => {
            if (output) {
                if (comparePass(password, output.password)) {
                    const access_token = generateToken({
                        id: output.id,
                        name: output.name,
                        email: output.email
                    })
                    res.status(200).json({access_token})
                } else {
                    throw {name:'InvalidInput'}
                }
            } else {
                throw {name:'InvalidInput'}
            }
        })
        .catch(err => next(err))
    } 
    
    static loginGoogle = (req, res, next) => {
        const { id_token } = req.body;
        let email = null;
        let name = null;
        const client = new OAuth2Client(process.env.GOOGLE_CLIENT_ID);
        client.verifyIdToken({
            idToken: id_token,
            audience: process.env.GOOGLE_CLIENT_ID
        })
        .then(ticket => {
            email = ticket.getPayload().email;
            name = ticket.getPayload().given_name;
            return User.findOne({where: {email}})
        })
        .then(output => {
            if (!output) {
                let password = Math.random().toString().substring(0,10)+'google'
                return User.create({email, name, password});
            } else {
                return output;
            }
        })
        .then(output => {
            const payload = {id: output.id, email: output.email};
            const access_token = generateToken(payload);
            res.status(200).json({access_token})
        })
        .catch(err => next(err));
    }

}


module.exports = UserController;