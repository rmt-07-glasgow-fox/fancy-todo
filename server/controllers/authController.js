const { User } = require('../models/index');

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

    static postSignIn (req, res, next) {}
}

module.exports = authController;