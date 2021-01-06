const { User } = require ('../models/index')
const { comparePassword } = require ('../helper/bcrypt')
const { generateToken } = require ('../helper/jwt')
const { OAuth2Client } = require ('google-auth-library')

class UserController {
  static async signUp (req, res, next) {
    try {
      const {email, password} = req.body
      let data = await User.create ({
        email, 
        password,
        location: 'Jakarta'
      })
      const response = {
        id: data.id,
        email: data.email
      }
      res.status (201).json (response)
    } catch (err) {
      next (err)
    }
  }

  static async signIn (req, res, next) {
    try {
      const { email, password } = req.body
      const user = await User.findOne ({
        where: {
          email: email
        }
      })
      if (!user) {
        throw new Error ('Invalid email / password')
      }
      const match = comparePassword (password, user.password)
      if (match) {
        const payload = {
          id: user.id,
          email: user.email
        }
        let name = ''
        for (let i = 0; i < user.email.length; i++) {
          if (user.email[i] === '@') {
            break
          }
          name += user.email[i]
        }
        const access_token = generateToken (payload) 
        res.status(200).json({
          access_token: access_token,
          name: name
        })
      } else {
        throw new Error ('Invalid email / password')
      }
    } catch (err) {
      next (err)
    }
  }

  static async googleSignIn (req, res, next) {
    try {
      const { id_token } = req.body
      const client = new OAuth2Client(process.env.GOOGLE_CLIENT_ID);

      const ticket = await client.verifyIdToken({
        idToken: id_token,
        audience: process.env.GOOGLE_CLIENT_ID,
      })

      const payload = ticket.getPayload();
      const email = payload.email

      const user = await User.findOne ({
        where: {
          email
        }
      })
      console.log (email)
      if (!user) {
        let createdUser = await User.create ({
          email,
          password: Math.random ()*1000 + 'secret',
          location: 'Jakarta'
        })
      } else {
          const payload = {
            id: user.id,
            email: user.email,
          }
          console.log (user, 'usergoogle')
          let name = ''
          for (let i = 0; i < user.email.length; i++) {
            if (user.email[i] === '@') {
              break
            }
            name += user.email[i]
          }
          const access_token = generateToken (payload) 
          res.status(200).json({
            access_token: access_token,
            name: name
          })
      }
    } catch (err) {
      console.log (err, 'err signin google')
    }
  }
}

module.exports = UserController