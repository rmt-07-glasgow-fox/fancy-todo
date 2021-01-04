const { comparePassword } = require('../helpers/bcrypt')
const { generateToken } = require('../helpers/jwt')
const { User } = require('../models')

class userController {
    static register(req,res){
        const { email, password } = req.body
        User.create({email,password})
        .then(user => {
            res.status(201).json({
                id:user.id,
                email:user.email
            })
        })
        .catch(err => {
            if(err.errors) {
                err.errors = err.errors.map(e=>e.message)
                res.status(400).json(err)
            }
            else res.status(500).json({message:'Internal server error'})
        })
    }

    static login(req,res){
        const { email, password } = req.body
        User.findOne({
            where:{email}
        })
        .then(user => {
            if(user){
                const match = comparePassword(password, user.password)
                if(match){
                    const payload = {
                        id:user.id,
                        email:user.email
                    }
                    const accessToken = generateToken(payload)
                    return res.status(200).json({
                        accessToken
                    })
                }else{
                    return res.status(401).json({message:'invalid email / password'})
                }
            }else{
                return res.status(401).json({message:'invalid email / password'})
            }
        })
    }
}

module.exports = userController