const { comparePass } = require('../helpers/bcrypt');
const { User } = require('../models');
const { generateToken } = require('../helpers/jwt');

class UserController {
    static registerPost = (req, res) => {
        const { email, name, password } = req.body;
        User.create({email, name, password })
        .then(output => res.status(201).json({id: output.id, email: output.email}))
        .catch(err => res.status(400).json(err));
    }
    static loginPost = (req, res) => {
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
                    throw {message: 'Invalid email/password'}
                }
            } else {
                throw {message: 'Invalid email/password'}
            }
        })
        .catch(err => res.status(400).json(err));
    }
}

module.exports = UserController;