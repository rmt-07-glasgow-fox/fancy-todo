const { User } = require('../models')
const { comparePassword } = require('../helpers/bcrypt');
const generateToken = require('../helpers/jwt');

const { OAuth2Client } = require('google-auth-library');


class AuthController {
    static async login(req, res, next) {
        const { email, password } = req.body;

        try {
            const user = await User.findOne({ where: { email: email } });

            if (!user) {
                return next({ name: "authValidate" })
            }

            const checkPassword = comparePassword(password, user.password);

            if (!checkPassword) {
                return next({ name: "authValidate" })
            }

            const payload = {
                id: user.id,
                email: user.email
            }

            const access_token = generateToken(payload);

            console.log(access_token, '<<<< sini nanda');

            return res.status(200).json({
                status: 'success',
                message: 'login succesfully',
                fullname: user.fullname(),
                access_token
            })

        } catch (err) {
            next(err)
        }
    }

    static async loginGoogle(req, res, next) {
        const { id_token } = req.body;
        const client = new OAuth2Client(process.env.GOOGLE_ID_TOKEN);

        async function verify() {
            const ticket = await client.verifyIdToken({
                idToken: id_token,
                audience: process.env.GOOGLE_ID_TOKEN,
            });
            const payload = ticket.getPayload();
            const email = payload.email;
            const firstName = payload.given_name;
            const lastName = payload.family_name;

            let checkUser;
            checkUser = await User.findOne({ where: { email } });

            if (!checkUser) {
                checkUser = await User.create({
                    firstName,
                    lastName,
                    email,
                    password: Math.random() * 1000 + ' google random password rahasia'
                })
            }

            const payloadJwt = {
                id: checkUser.id,
                email: checkUser.email
            }

            const access_token = generateToken(payloadJwt);

            return res.status(201).json({
                status: 'success',
                message: 'login succesfully',
                fullname: checkUser.fullname(),
                access_token
            })
        }
        verify().catch(err => next(err))

    }

    static async register(req, res, next) {
        const { firstName, lastName, email, password } = req.body;
        const input = { firstName, lastName, email, password };

        try {
            const data = await User.create(input);

            return res.status(201).json({
                status: 'success',
                data
            })
        } catch (err) {
            return next(err)
        }

    }
}

module.exports = AuthController