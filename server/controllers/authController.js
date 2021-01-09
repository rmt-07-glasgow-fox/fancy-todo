const { User } = require('../models')
const { comparePassword } = require('../helpers/bcrypt')
const { generateToken } = require('../helpers/jwt')
const { OAuth2Client } = require('google-auth-library');

class AuthController {
  static signUp(req, res, next) {
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
      next(err)
    })
  }
  
  static signIn(req, res, next) {
    const { email, password } = req.body
    console.log(email, password)
    User.findOne({where: {
      email: email
    }})
    .then((user) => {
      if(!user) {
        return next({ name: 'invalidEmailPassword' })
      }
      
      const match = comparePassword(password, user.password)
      if(match) {
        const payload = {
          id: user.id,
          email: user.email
        }
        const access_token = generateToken(payload)
        return res.status(200).json({access_token})
      } else {
        next({ name: 'invalidEmailPassword' })
      }
    }).catch((err) => {
      next(err)
    })
  }

  static loginGoogle(req, res, next) {
    const { id_token } = req.body

    let email = null
    const client = new OAuth2Client(process.env.GOOGLE_CLIENT_ID)
    client.verifyIdToken({
      idToken: id_token,
      audience: process.env.GOOGLE_CLIENT_ID
    })
    .then(ticket => {
      const payload = ticket.getPayload();
      email = payload.email

      return User.findOne({
        where: { email }
      })
    })
    .then(user => {
      if(!user){
        return User.create({
          email,
          password: Math.random()*1000+'google'
        })
      } else {
        return user
      }
    })
    .then(user => {
      const payload = {
        id: user.id,
        email: user.email
      }
      const access_token = generateToken(payload)
      res.status(200).json({
        access_token
      })
    })
    .catch(err => {
      console.log(err)
      next(err)
    })
  }
}

module.exports = AuthController
