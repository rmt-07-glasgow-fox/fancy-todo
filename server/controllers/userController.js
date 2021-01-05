const { User } = require('../models')
const { checkPassword } = require('../helpers/bcrypt')
const { generateToken } = require('../helpers/jwt')

class ControllerUser {
  static register(req, res) {
    const input = {
      email: req.body.email,
      password: req.body.password
    }

    User.create(input)
      .then(user => {
        const response = {
          id: user.id,
          email: user.email
        }
        res.status(201).json(response)
      })
      .catch(err => {
        res.status(400).json(err)
      })
  }

  static login(req, res) {
    const userLogin = {
      email: req.body.email,
      password: req.body.password
    }

    User.findOne({
      where: {
        email: userLogin.email
      }
    })
      .then(user => {
        if (!user) {
          res.status(401).json({
            message: 'Invalid email or password'
          })
        }

        const match = checkPassword(userLogin.password, user.password)
        if (match) {
          const payload = {
            id: user.id,
            email: user.password
          }
          const accessToken = generateToken(payload)
          res.status(200).json({
            accessToken
          })
        } else {
          res.status(401).json({
            message: 'Invalid email or password'
          })
        }
      })
      .catch(err => {
        console.log(err)
        res.status(401).json(err)
      })
  }
}

module.exports = ControllerUser
