const { User } = require('../models')

const { OAuth2Client } = require('google-auth-library');
const { getToken } = require('../helper/jwt')
const { comparePass } = require('../helper/bcrypt')


const { randomPass } = require('../helper/randomPass')
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

                throw {
                    status : 404,
                    message : 'Invalid email / password'
                }
            } else {
                if(compare) {
                    const access_token = getToken({
                        id : getUser.id,
                        email : getUser.email,
                    })
    
                    res.status(200).json({
                        access_token
                    })
                } else {
  
                    throw {
                        status : 401,
                        message : 'Invalid email / password'
                    }
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

    static googleLogin(req, res, next) {
        const client = new OAuth2Client(process.env.CLIENT_ID);

        let payload
        
       client.verifyIdToken({
           idToken : req.body.googleToken,
           audience : process.env.GOOGLE_CLIENT_ID
       })
       .then(ticket => {
           payload = ticket.getPayload()
           return User.findOne({where : 
            { email : payload .email }
        })
       })
       .then(user => {
           if(user) {
               return user
           } else {
               return User.create({ email : 
                { 
                    email : payload.email,
                    password : randomPass()
                }
            })
           }
       })
       .then(user => {
           const access_token = getToken( {
               id : user.id,
               email : user.email
           })

           res.status(200).json({
               access_token
           })
       })
       .catch(err => {
           next(err)
       })
    
    }

    static newsWidget(req, res, next) {
        const axios = require('axios')
        let newsFive = []

        const newsAPI = 'https://www.news.developeridn.com/'

        axios.get(newsAPI)
        .then(response => {
            for(let i = 0 ; i < 5 ; i++) {
                newsFive.push(response.data.data[i])
            }
            res.send(200).json(newsFive)
        })
        .catch(err => {
            next(err)
        })
    }

    static async getUser(req, res, next) {
        try {
            const getData = await User.findAll()

            if(!getData) {
                throw {
                    status : 401,
                    message : 'Bad Request'
                }
            } else {
                res.status(200).json(getData)
            }
        } catch (err) {
            next(err)
        }
    }

    static async editUser(req, res, next) {
        let idEdit = +req.params.id

        let edittedUser = {
            email : req.body.email,
        }
        
        try {
            const data = await User.update(edittedUser, {where :
                { id : idEdit}
            })
            if(!data) {
                throw {
                    status : 404,
                    message : 'Error not found'
                }
            } else {
                res.status(200).json(data)
            }
        
        } catch (err) {
            next(err)
        }
        
    }
}

module.exports = Controller