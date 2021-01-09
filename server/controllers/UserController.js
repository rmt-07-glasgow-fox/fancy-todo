const { User } = require('../models')
const { OAuth2Client } = require('google-auth-library')
const decryptPassword = require('../helpers/encryptAndDecrypt').decryptPassword
const generateToken = require('../helpers/jwtHelper').generateToken

class UserController {
  static userRegister(req, res, next){
    User.create({
      email: req.body.email || '',
      password: req.body.password || ''
    })
      .then(data => {
        res.status(201).json({
          id: data.id,
          email: data.email
        })
      })
      .catch(err => {
        if(err.errors){
          next({
            status: 400,
            data: err
          })
        }
        next({
          status: 500,
          data: err
        })
      })
  }
  static userLogin(req, res, next){
    User.findOne({
      where:{
        email: req.body.email || ''
      }
    })
      .then(data => {
        if(!data){
          next({
            status: 401
          })
        }else{
          let decryptedPassword = decryptPassword(req.body.password, data.password)
          if(decryptedPassword){
            let jwtToken = generateToken({
              id: data.id,
              email: data.email
            })
            res.status(200).json({
              jwtToken,
              userData: {
                email: data.email
              }
            })
          }else{
            next({
              status: 401
            })
          }
        }
      })
      .catch(err => {
        next({
          status: 500,
          data: err
        })
      })
  }
  static userGoogleLogin(req, res, next){
    const { id_token } = req.body
    let email
    const client = new OAuth2Client(process.env.GOOGLE_CLIENT_ID);
    client.verifyIdToken({
      idToken: id_token,
      audience: process.env.GOOGLE_CLIENT_ID,
    })
      .then(data => {
        const payload = data.getPayload()
        email = payload.email
        return User.findOne({
          where:{
            email
          }
        })
      })  
      .then(user => {
        if(!user){
          return User.create({
            email,
            password: (Math.random()*1000+`${process.env.JWT_SECRET}`).toString()
          })
        }else{
          return user
        }
      })
      .then(data => {
        let jwtToken = generateToken({
          id: data.id,
          email: data.email
        })
        res.status(200).json({
          jwtToken,
          userData: {
            email: data.email
          }
        })
      })
      .catch(err => {
        next({
          status: 500,
          data: err
        })
      })
  }
}

module.exports = UserController