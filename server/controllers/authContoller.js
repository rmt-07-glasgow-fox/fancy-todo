const { User } = require('../models')
const { comparePassword } = require('../helpers/bcrypt');
const generateToken = require('../helpers/jwt');


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

            return res.status(200).json({
                status: 'success',
                message: 'login succesfully',
                token: access_token.token,
                refresh_token: access_token.refreshToken
            })

        } catch (err) {
            next(err)
        }
    }

    static async register(req, res, next) {
        const { email, password } = req.body;
        const input = { email, password };

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