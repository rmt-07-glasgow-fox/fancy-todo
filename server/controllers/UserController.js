const { User } = require ('../models/index')
const { comparePassword } = require ('../helper/bcrypt')
const { generateToken } = require ('../helper/jwt')

class UserController {
  static async signUp (req, res) {
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
      return res.status(400).json(err)
    }
  }

  static async signIn (req, res) {
    try {
      const { email, password } = req.body
      const user = await User.findOne ({
        where: {
          email: email
        }
      })
      if (!user) {
        return res.status(401).json({
          message: 'Invalid email / password'
        })
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
        res.status(401).json({
          message: "Invalid email /password"
        })
      }
    } catch (err) {
      res.status(401).json(err)
    }
  }
}

module.exports = UserController