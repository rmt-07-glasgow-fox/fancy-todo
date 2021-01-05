const { User } = require('../models')
const { comparePassword } = require('../helper/bcrypt')
const { generateToken } = require('../helper/jwt')

class UserController {
  static async register(req, res) {
    try {
      const { email, password } = req.body
      const data = await User.create({email, password})
      const response = {
        id: data.id,
        email: data.email
      }
      return res.status(201).json(response)
    } catch (err) {
      return res.status(400).json(err)
    }
  }

  static async login(req, res) {
    try {
      const { email, password } = req.body
      const data = await User.findOne({
        where: {
          email
        }
      })
      if(!data) {
        return res.status(401).json({
          message: 'Invalid email / password'
        })
      }
      const match = comparePassword(password, data.password)
      if (match ) {
        const payload = {
          id: data.id,
          email: data.email
        }
        const access_token = generateToken(payload)
        return res.status(200).json({
          access_token
        })
      } else {
        return res.status(401).json({
          message: 'Invalid email / password'
        })
      }
    } catch (err) {
      return res.status(401).json(err)
    }
  }
}

module.exports = UserController