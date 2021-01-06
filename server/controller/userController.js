const { User } = require('../models')

const { OAuth2Client } = require('google-auth-library');
const { getToken } = require('../helper/jwt')
const { comparePass } = require('../helper/bcrypt')

//change to async await

class Controller {
    static async login (req, res, next) {
        let userEmail = req.body.email
        let userPass = req.body.password
        
        try {
            const getUser = await User.findOne({where : 
                { email : userEmail }
            })

            let compare = comparePass(userPass, getUser.password)

            if(!getUser) {
                res.status(404).json( {
                    message : 'Invalid email / password'
                })
            } else {
                if(compare) {
                    const accessToken = getToken({
                        id : getUser.id,
                        email : getUser.email,
                    })
    
                    res.status(200).json({
                        accessToken
                    })
                } else {
                    res.status(401).json({
                        message : 'invalid email / password'
                    })
                }
            } 

        } catch (err) {
            next(err)
        }


        // User.findByPk(userId)
        // .then(data => {
        //     if(!data) {
        //         res.status(404).json({
        //             message : 'Error not found'
        //         })
        //     } else if (comparePass(pass, data.password)){
        //         let checkAccess = getToken( {
        //             id : data.id,
        //             email : data.email,
        //         })

        //         res.status(200).json({checkAccess})    
        //     } else {
        //         res.status(401).json({
        //             message : 'invalid email / password'
        //         })
        //     }
        // })
        // .catch(err => {
        //     next(err)
        // })
    }

    static async register(req, res, next) {
        const newUser = {
            email : req.body.email,
            password : req.body.password
        }

        try {
            const data = await User.create(newUser)

            res.status(201).json({
                id : data.id,
                email : data.email
            })

        } catch (err) {
            next(err)
        }

    }

    static async googleLogin(req, res, next) {
        const client = new OAuth2Client(process.env.CLIENT_ID);
        
        const ticket = await client.verifyIdToken({
            idToken: token,
            audience: CLIENT_ID, 
        });
        const payload = ticket.getPayload();
    
    }
}

module.exports = Controller