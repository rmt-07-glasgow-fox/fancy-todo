const {OAuth2Client} = require('google-auth-library');
const { User } = require('../models/')
const { comparePassword } = require('../helper/bcrypt')
const { generateToken } = require('../helper/jwt')

class UserController {
    static async signup (req, res) {
        const { userName, email, password } = req.body
        try {
            const data = await User.create({
                userName,
                email,
                password
            })
            res.status(201).json({
                userName: data.userName,
                email: data.email,
                password: data.password
            })
        } catch (err) {
            res.status(400).json(err)
        }
    }
    static async login (req, res) {
        try {
            const { email, password } = req.body
            const user = await User.findOne({
                where: { email }
            })
            if (!user) {
                res.status(401).json({
                    msg: 'Email or password not defined'
                })
            } else {
                const match = comparePassword(password, user.password)
                if (match) {
                    //jwt
                    const userDATA = {
                        id: user.id,
                        userName: user.userName,
                        email: user.email
                    }
                    const access_token = generateToken(userDATA)
                    res.status(200).json({
                        access_token
                    })
                } else {
                    res.status(401).json({
                        msg: 'Email or password not defined'
                    })
                }
            }
        } catch (err) {
            res.status(401).json(err)
        }
    }
    static async googleLogin(req, res) {
        try {
            const { id_token } = req.body;
            const client = new OAuth2Client(process.env.GOOGLE_CLIENT_ID);
            const ticket = await client.verifyIdToken({
                idToken: id_token,
                audience: process.env.GOOGLE_CLIENT_ID,
            });
            const payload = ticket.getPayload();
            console.log(payload, '<<<<<<<<<<===== payload');
            
            const email = payload.email;
            const data = await User.findOne({ 
                where: {
                    email
                }
            });
        if (data) {
            const access_token = generateToken({
                id: data.id,
                email: data.email,
            });
            res.status(200).json({
                access_token
            });
        } else {
            const createAcc = { 
                email,
                password: Math.random()*10000 + "random123",
            };
            const account = await User.create(createAcc);
            const access_token = generateToken({
                id: account.id,
                email: account.email,
            });
            res.status(200).json({
                access_token
            });
        }
        } catch (err) {
            console.log(err);
        }
    }
}

module.exports = UserController