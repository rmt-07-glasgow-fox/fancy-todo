const { User } = require('../models/index')
const { comparePassword } = require('../helpers/bcrypt')
const { generateToken} = require('../helpers/jwt')

class UserController{
    static async register(req, res){
        try{
            const opt = {
                email: req.body.email,
                password: req.body.password
            }

            const result = await User.create(opt)
            //balikin data id sama email aja
            const response = {
                id: result.id,
                email: result.email
            }

            return res.status(201).json(response)
        } catch (err){
            return res.status(400).json(err)
        }
    }

    static async login(req, res){
        try{
            const opt = {
                email: req.body.email,
                password: req.body.password
            }

            const result = await User.findOne({
                where: {
                    email : opt.email
                }
            })

            if(!result){
                return res.status(401).json({
                    message: 'Invalid email / password'
                })
            }

            const match = comparePassword(opt.password, result.password)

            if(match){
                //ngirim jwt
                const payload = {
                    id: result.id,
                    email: result.email
                }

                const access_token = generateToken(payload)

                return res.status(200).json({
                    access_token
                })
            }else{
                return res.status(401).json({
                    message: 'Invalid email / password'
                })
            }

            // return res.status(200).json(result)

        } catch(err) {
            return res.status(401).json(err)
        }
        


    }
}

module.exports = UserController