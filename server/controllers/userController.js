const {User} = require('../models')
const {comparePass} = require('../helpers/bcrypt')
const {loginToken} = require('../helpers/jwt')

class UserController {
    static register (req, res) {
        const {email, password} = req.body
        User.create({
            email, password
        })
        .then((result) => {
           
            res.status(201).json('email succesfully registered')

            
        }).catch((err) => {
            if (err.name === 'SequelizeValidationError') {
                res.status(400).json(err.message)
                
            } else {
                res.status(500).json('internal server error')
                
            }
        });
    }
    static async login(req,res){
        try {
            const input = {
                email: req.body.email,
                password: req.body.password
            }

            const user = await User.findOne({
                where:{
                    email: input.email
                }
            })
            if(!user){
                res.status(401).json({
                    message: 'Wrong email or password'
                })
            }else if(!comparePass(input.password, user.password)){
                res.status(401).json({
                    message: 'Wrong email or password'
                })
            }else{
                const accessToken = loginToken({
                    id: user.id,
                    email: user.email
                })
                res.status(200).json({accessToken})
            }

            
        } catch (err) {
            console.log(err);
            next(err)
        }
    }
}



module.exports = UserController