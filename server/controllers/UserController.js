const { User } = require('../models')
const decryptPassword = require('../helpers/encryptAndDecrypt').decryptPassword
const generateToken = require('../helpers/jwtHelper').generateToken

class UserController {
  static userRegister(req, res){
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
          res.status(400).json({
            errors
          })
        }
        res.status(500).json(err)
      })
  }
  static userLogin(req, res){
    User.findOne({
      where:{
        email: req.body.email || ''
      }
    })
      .then(data => {
        if(!data){
          res.status(404).json({
            message: 'Login failed. Invalid email or password'
          })
        }else{
          let decryptedPassword = decryptPassword(req.body.password, data.password)
          if(decryptedPassword){
            let jwtToken = generateToken({
              id: data.id,
              email: data.email
            })
            res.status(200).json({
              jwtToken
            })
          }else{
            res.status(404).json({
              message: 'Login failed. Invalid email or password'
            })
          }
        }
      })
      .catch(err => {
        res.status(500).json(err)
      })
  }
}

module.exports = UserController