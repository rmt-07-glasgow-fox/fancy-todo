const { OAuth2Client } = require('google-auth-library')
const { user, Sequelize } =  require('../models/index')
const { comparePassword } = require('../helpers/bcrypt');
const { generateTokenJwt } = require('../helpers/jwt');

class userController {
    static register( req, res, next) {
        let newRegis = {
            email: req.body.email,
            phoneNumber: req.body.phoneNumber,
            password: req.body.password
        }
        let dataUser

        user.create(newRegis)
        .then(data => {
            dataUser = {
                id: data.id,
                email: data.email,
                phoneNumber: data.phoneNumber
            }
            res.status(201).json(dataUser)
        }) 
        .catch(err => {
            next(err)
        })
    }

    static login (req, res, next) {
        let login = {
            search: req.body.search,
            password: req.body.password
        }
        user.findAll({
            where: Sequelize.or(
              { email: login.search },
              { phoneNumber: login.search}
            )
          })
        .then( data => {
            let data_login = data[0].dataValues
            const passMatch = comparePassword(login.password, data_login.password)  
           
                if(passMatch){
                    let payload = { 
                        id: data_login.id,
                        email: data_login.email
                    } 
                    const access_token = generateTokenJwt(payload)  
                    return res.status(200).json({access_token: access_token})
                } else {
                    next({name: 'JsonWebTokenError', msg: 'Invalid Email/Phone Number or Password'})
                }
        })
        .catch(err => {
            next({name: 'NotFoundError', msg: 'Invalid Email/Phone Number or Password'})

        })
    }

    static loginGoogle (req, res, next) {
        const { id_token } = req.body
        let objUser
        const CLIENT_ID = process.env.GOOGLE_CLIENT_ID 
        const client = new OAuth2Client(CLIENT_ID);
        client.verifyIdToken({
            idToken: id_token,
            audience: CLIENT_ID,  
        })
        .then(ticket => {
            const payload = ticket.getPayload();
            objUser =  {
                email: payload.email,
                password: String(Math.random()*1000)
            }
        return user.findOne({where: {email: objUser.email}})
        })
        .then(data => {
            if (!data) {
                return user.create(objUser)
            } else {
                return data
            }
        })
        .then(data => {
            let payload = { 
                id: data.id,
                email: data.email 
            } 
            const access_token = generateTokenJwt(payload)  
            return res.status(200).json({access_token: access_token})
        })
        .catch( err => {
            next(err)
        })
    } 
}

module.exports = userController 