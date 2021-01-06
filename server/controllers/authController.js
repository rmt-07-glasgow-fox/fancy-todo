const { User } = require("../models")
const { comparePassword } = require("../helpers/hashPassword")
const { generateToken } = require("../helpers/jwt")

class Authentication {

  static signUp(req, res) {
    const newUser = {
      email: req.body.email,
      password: req.body.password
    }

    User.create(newUser)
    .then(user => {
      return res.status(201).json({id: user.id, email: user.email})
    })
    .catch(err => {
      return res.status(400).json(err)
    })
  }

  static async signIn(req, res) {
    try {
      const {email, password} = req.body

      const user = await User.findOne({where: {email}})
      
      if (!user) {
        return res.status(400).json({message: `Invalid email / password`})
      }

      const matchPassword = comparePassword(password, user.password)

      if(matchPassword) {
        const payload = {
          id: user.id,
          email: user.email
        }

        const access_token = generateToken(payload)
        return res.status(200).json({access_token})
      } else {
        return res.status(400).json({message: `Invalid email / password`})
      }
    } catch(err) {
      return res.status(400).json(err)
    }
  }
}

module.exports = Authentication