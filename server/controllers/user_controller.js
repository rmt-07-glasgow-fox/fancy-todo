const {OAuth2Client} = require('google-auth-library');
const { comparePassword } = require('../helpers/byecrypt')
const { generateToken } = require('../helpers/jwt')
const {User} = require('../models')

class UserController {
  static async signup(req, res, next) {

    let {email, password} = req.body

    try {
      let user = await User.create({email, password})
      let userInstance = {
        id: user.id,
        email: user.email
      }

      return res.status(201).json(userInstance)
    } catch(error) {
      if (error) {
        let msg = error.errors.map((err) => err.message)
        return res.status(400).json(msg)
      } else {
        return res.status(500).json('Internal server error')
      }
    }
  }

  static async signin(req, res, next) {
    let {email, password} = req.body

    try {
      let user = await User.findOne({
        where: {
          email: email
        }
      })

      if (!user) {
        next({name: 'errorAuth'})
      }

      const isMatch = comparePassword(password, user.password)

      if (isMatch) {
        const payload = {
          id: user.id,
          email: user.email
        }

        const access_token = generateToken(payload)
        console.log("USER YG SEDANG LOGIN", user.email);
        return res.status(200).json({access_token, email: user.email})

      } else {
        next({name: 'errorAuth'})
      }

      // return res.status(200).json(user)
    } catch(error) {
      return res.status(401).json(error)
    }
  }

  static async googleSignin(req, res, next) {
    try {
      const {id_token} = req.body
      const client = new OAuth2Client(process.env.GOOGLE_CLIENT_ID);
      const ticket = await client.verifyIdToken({
        idToken: id_token,
        audience: process.env.GOOGLE_CLIENT_ID,
      });
      const payload = ticket.getPayload();
      let email = payload.email

      let user = await User.findOne({
        where: {
          email
        }
      })

      if (!user) {
        user = await User.create({
          email,
          password: Math.random()*100+'mahpassword'
        })
      }

      const _payload = {
        id: user.id,
        email: user.email
      }

      const access_token = generateToken(_payload)
      console.log("USER YG SEDANG LOGIN", user.email);
      return res.status(200).json({access_token, email: user.email})

    } catch(error) {
      next(error)
    }

  }
}

module.exports = UserController