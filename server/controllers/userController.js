const {User} = require('../models')
const {comparePass} = require('../helpers/bcrypt')
const {loginToken} = require('../helpers/jwt')
const {OAuth2Client} = require('google-auth-library')

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

    static async googleLogin(req, res) {
        try {
        const google_token = req.body.google_token;
        const client = new OAuth2Client(process.env.CLIENT_ID);
        const ticket = await client.verifyIdToken({
            idToken: google_token,
            audience: process.env.CLIENT_ID,
        });
        const payload = ticket.getPayload();
       
        console.log(payload);
        const email = payload.email;
        const user = await User.findOne({ where: { email: payload.email } });
        if (user) {
            const accessToken = loginToken({
            id: user.id,
            email: user.email,
            });
            res.status(200).json({accessToken});
            console.log(accessToken);
        } else {
            const userObj = {
            email,
            password: "random",
            };
            const newUser = await User.create(userObj);
            const accessToken = loginToken({
            id: newUser.id,
            email: newUser.email,
            });
            res.status(200).json({accessToken});
        }
        } catch (err) {
            next(err)
        }
    }
}



module.exports = UserController