const { OAuth2Client } = require('google-auth-library');
const { User } = require('../models/index');
const { comparePass } = require('../helpers/bcrypt');
const { getToken } = require('../helpers/jwt');

class authController {
    static async postSignUp (req, res, next) {
        try {
            let data = {
                email: req.body.email,
                password: req.body.password
            };
    
            data = await User.create(data);

            data = {
                id: data.id,
                email: data.email
            };

            return res.status(201).json(data);
        } catch (err) {
            if (err.errors) {
                return next({ code: 400, name: 'Validaton Error', msg: err });
            }
            
            return next({ code: 500 });
        }
    }

    static async postSignIn (req, res, next) {
        try {
            let match = false;

            let data = await User.findAll({ where: { email: req.body.email } });

            if (data[0]) {
                if (comparePass(req.body.password, data[0].password)) {
                    let payload = {
                        id: data[0].id,
                        email: data[0].email
                    };

                    res.status(200).json({ token: getToken(payload) });
                } else {
                    next({ code: 400, name: 'Error Login', msg: { errors: [{ message: 'Wrong password or email!!!'}] } });
                }
            } else {
                next({ code: 400, name: 'Error Login', msg: { errors: [{ message: 'Wrong password or email!!!'}] } });
            }
        } catch (err) {
            next({ code: 500 });
        }
    }

    static async googleLogin (req, res, next) {
        try {
            let client = new OAuth2Client(process.env.GOOGLE_AUTH_KEY);
    
            let ticket = await client.verifyIdToken({
                idToken: req.body.id_token,
                audience: process.env.GOOGLE_AUTH_KEY
            });

            let payload = ticket.getPayload();
            
            let data = await User.findOne({ where: { email: payload.email } });

            if (!data) {
                data = await User.create({
                    email: payload.email,
                    password: `${Math.floor(Math.random() * 1000000) + 1000000}`
                });
            }

            payload = {
                id: data.id,
                email: data.email
            };

            res.status(200).json({ token: getToken(payload) });
        } catch (err) {
            next({ code: 500 });
        }
    }
}

module.exports = authController;