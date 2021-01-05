const { comparePassword } = require('../helpers/bcrypt');
const { generateToken } = require('../helpers/generateToken');
const {User} = require('../models')

class UsersController{
    static registerUser(req, res) {
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
            return res.status(400).json(err.message)
        })
    }
    static loginUser(req, res) {
        let {email, password} = req.body
        User.findOne({where: {email}})
        .then(user => {
            if(!user){
                return res.status(401).json({message: "Invalid Email / Password"})
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
                return res.status(401).json({message: "Invalid Email / Password"})
            }
        })
        .catch(err => {
            return res.status(401).json(err)
        })
    }
}

module.exports = UsersController
