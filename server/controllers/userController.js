const { comparePassword } = require('../helpers/bcrypt');
const { generateToken } = require('../helpers/generateToken');
const {User} = require('../models')

class UsersController{
    static registerUser(req, res, next) {
        let {name, email, password} = req.body
        User.create({
            name, email, password
        })
        .then(user => {
            const response = {
                id: user.id,
                name: user.name,
                email: user.email
            }
            return res.status(201).json(response);
        })
        .catch(err => {
            next(err)
        })
    }
    static loginUser(req, res,next) {
        let {email, password} = req.body
        User.findOne({where: {email}})
        .then(user => {
            if(!user){
                next({name: "wrongInput"})
            }
            const match = comparePassword(password, user.password)
            if(match){
                const payload = {
                    id: user.id,
                    name: user.name,
                    email: user.email
                }
                const access_token = generateToken(payload)
                return res.status(200).json({access_token});
            }else {
                next({name: "wrongInput"})
            }
        })
        .catch(err => {
            next(err)
        })
    }
}

module.exports = UsersController
