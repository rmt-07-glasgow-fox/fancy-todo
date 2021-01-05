const { User } = require('../models')
const { comparePassword } = require('../helpers/bcrypt')
const { generateToken } = require('../helpers/jwt')

class AuthController {
  static signUp(req, res){
    const newUser = {
      email: req.body.email,
      password: req.body.password
    }
    User.create(newUser)
    .then((result) => {
      res.status(201).json({
        id: result.id,
        email: result.email
      })
    }).catch((err) => {
      if(err.errors){
        const errMessages = []
        err.errors.forEach(element => {
            errMessages.push(element.message)
        });
        res.status(400).json(errMessages)
      } else {
        res.status(500).json({
          msg: 'internal server error'
        })
      }
    });
  }
  
  static signIn(req, res){
    const { email, password} = req.body
    console.log(email, password)
    User.findOne({where: {
      email: email
    }})
    .then((user) => {
      if(!user){
        return res.status(401).json({
          msg: 'Invalid email/ password'
        })
      }
      
      const match = comparePassword(password, user.password)
      if(match){
        const payload = {
          id: user.id,
          email: user.email
        }
        const access_token = generateToken(payload)
        return res.status(200).json({access_token})
      } else {
        return res.status(401).json({
          msg: 'Invalid email/ password'
        })
      }
    }).catch((err) => {
      return res.status(401).json(err)
    });
  }
}

module.exports = AuthController
