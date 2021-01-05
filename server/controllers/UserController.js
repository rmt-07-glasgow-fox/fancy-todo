const { User } = require ('../models/index')
const { comparePassword } = require ('../helper/bcrypt')
const { generateToken } = require ('../helper/jwt')

class UserController {
  static async signUp (req, res, next) {
    try {
      const {email, password} = req.body
      let data = await User.create ({
        email, password
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
        const access_token = generateToken (payload) 
        res.status(200).json({
          access_token: access_token
        })
      } else {
        throw new Error ('Invalid email / password')
      }
    } catch (err) {
      next (err)
    }
  }
}

module.exports = UserController