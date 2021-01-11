const User = require('../models/index').User
const { comparePassword } = require('../helpers/bcrypt')
const { generateToken } = require('../helpers/jwt')
const {OAuth2Client} = require('google-auth-library');

class UserController {
  static register (req, res){
    const {email, password} = req.body
    User.create({email, password})
    .then(user => {
      const result = {
        id: user.id,
        email: user.email
      }
      return res.status(201).json(result)
    })
    .catch(err => {
      return res.status(400).json(err)
    })
  }
  static async login(req, res){
    try {
      const {email, password} = req.body
      const user = await User.findOne({
        where: {email}
      })
      if (!user){
        return res.status(401).json({message: 'invalid email/password'})
      }
      const match = comparePassword(password, user.password)
      if (match){
        // console.log('masuk if match')
        const payload = {
          id: user.id,
          email: user.email
        }
        // console.log(payload, 'ini payload')
        const access_token = generateToken(payload)
        // console.log(access_token)
        return res.status(200).json({ access_token })

      } else {
        return res.status(401).json({message: 'invalid email/password'})
      }
      return res.status(200).json(user)
    } catch(err){
      return res.status(401).json(err)
    }
  }

  static loginGoogle(req, res, next){
    let id_token = req.body.id_token
    const client = new OAuth2Client(process.env.CLIENT_ID);
    let email = null
    client.verifyIdToken({
        idToken: id_token,
        audience: process.env.CLIENT_ID
    }).then(ticket => {
      const payload = ticket.getPayload();
      email = payload.email
      return User.findOne({
        where: {
          email: email
        }
      })
    }).then(user => {
      if(!user){
        return User.create({
          email: email,
          password: 'randompassword'
        })
      } else {
        return user
      }
    }).then(user => {
      const payload = {
        id: user.id,
        email: user.email
      }
      const access_token = generateToken(payload)
      return res.status(200).json({ access_token })
    }).catch(err => {
      next()
    })
  }
}

module.exports = UserController