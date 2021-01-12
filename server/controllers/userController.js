const {OAuth2Client} = require('google-auth-library');
const {
  User
} = require("../models")
const { 
  compare
} = require("../helpers/bcrypt")
const {
  generateToken
} = require("../helpers/jwt")


class UserController {
  static register (req, res, next) {
    const { email, password } = req.body
    User.create ({email, password})
    .then(data => {
      return res.status(201).json(data)
    })
    .catch(err => {
      next(err)
    })
  }

  static async login (req, res, next) {
    try {
      const { email, password} = req.body
      const user = await User.findOne({
        where: {
          email
        }
      })
      if (!user) {
        next({
          name: "wrongLogin",
        })
      }
      const isValidPass = compare(password, user.password)
      if (isValidPass) {
        const payload = {
          id: user.id,
          email: user.email
        }
        const access_token =  generateToken(payload)
        return res.status(200).json({
          access_token
        })
      } else {
        next({
          name: "wrongLogin",
        })
      }
    } catch (err) {
      next(err)
    }
  }

  static googleLogin (req, res, next) {
    const { id_token } = req.body
    let email

    const client = new OAuth2Client(process.env.GOOGLE_CLIENT_ID);
    client.verifyIdToken({
      idToken: id_token,
      audience: process.env.GOOGLE_CLIENT_ID,
    })
    .then(ticket => {
      const payload = ticket.getPayload();
      email = payload.email
      return User.findOne({
        where: {
          email
        }
      })
    })
    .then(user => {
      if (!user) {
        return User.create({
          email,
          password: Math.floor(Math.random() * 999999) + "pass"
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
      const access_token =  generateToken(payload)
      return res.status(200).json({
        access_token
      })
    })
    .catch(err => {
      next(err)
    })
  }
}

module.exports = UserController