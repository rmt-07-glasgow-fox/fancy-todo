const {User} = require('../models')
const {comparePassword} = require("../helpers/bcrypt")
const {generateToken} = require("../helpers/jwt")

class UserController {
  static register(req,res) {
    const {email,password} = req.body
    User.create({
      email, password
    })
      .then(data => {
        const result = {
          id: data.id,
          email: data.email
        }
        return res.status(201).json(result)
      })
      .catch(err => {
        return res.status(400).json(err)
      })
  }
  static async login(req,res) {
    try {
      const {email,password} = req.body
      const user = await User.findOne({
        where: {
          email:email
        }
      })
      if(!user) {
        throw {
          message: "Invalid email / password"
        }
      }
      const match = comparePassword(password, user.password)
      if(match) {
        const payload = {
          id: user.id,
          email: user.email
        }
        const access_token = generateToken(payload)
        return res.status(200).json({
          access_token: access_token
        })
      } else {
        throw {
          message: "Invalid email / password"
        }
      }
    }
    catch(err) {
      return res.status(401).json(err)
    }
  }
}

module.exports = UserController