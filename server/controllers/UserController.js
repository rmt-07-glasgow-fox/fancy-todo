const { User } = require('../models')
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
          let errors = []
          err.errors.forEach(error => {
            errors.push(error.message)
          })
          next({
            status: 400,
            data: errors
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
}

module.exports = UserController