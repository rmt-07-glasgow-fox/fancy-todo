const { User } = require('../models')
const { comparePassword } = require('../helpers/bcrypt');
const generateToken = require('../helpers/jwt');


class AuthController {
    static async login(req, res) {
        const { email, password } = req.body;

        try {
            const user = await User.findOne({ where: { email: email } });

            if (!user) {
                return res.status(401).json({
                    status: 'error',
                    message: 'invalid email or password from email wrong'
                })
            }

            const checkPassword = comparePassword(password, user.password);

            if (!checkPassword) {
                return res.status(401).json({
                    status: 'error',
                    message: 'invalid email or password from password wrong'
                })
            }

            const payload = {
                id: user.id,
                email: user.email
            }

            const access_token = generateToken(payload);

            return res.status(200).json({
                status: 'success',
                message: 'login succesfully',
                token: access_token.token,
                refresh_token: access_token.refreshToken
            })

        } catch (err) {
            if (err.name = "SequelizeValidationError") {
                let temp = [];

                if (err.errors.length > 0) {
                    err.errors.forEach(el => temp.push(el.message))

                    return res.status(400).json({
                        status: 'error',
                        message: temp
                    })
                }
            }

            return res.status(500).json({
                status: 'error',
                message: err.message
            })
        }
    }

    static async register(req, res) {
        const { email, password } = req.body;
        const input = { email, password };

        try {
            const data = await User.create(input);

            return res.status(201).json({
                status: 'success',
                data
            })
        } catch (err) {
            if (err.name = "SequelizeValidationError") {
                let temp = [];

                if (err.errors.length > 0) {
                    err.errors.forEach(el => temp.push(el.message))

                    return res.status(400).json({
                        status: 'error',
                        message: temp
                    })
                }
            }


            return res.status(500).json({
                status: 'error',
                message: err.message
            })
        }

    }
}

module.exports = AuthController