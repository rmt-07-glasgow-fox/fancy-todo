const { User } = require('../models')
const { comparePassword } = require('../helpers/bcrypt')
const { generateToken } = require('../helpers/jwt')

class UserController {
  static register(req, res, next) {
    const newUser = {
      email: req.body.email,
      password: req.body.password
    }
    User.create(newUser)
      .then(data => {
        const response = {
          id: data.id,
          email: data.email
        }
        res.status(201).json(response)
      })
      .catch(err => {
        next(err)
      })
  }

  static login(req, res, next) {
    const loginObj = {
      email: req.body.email,
      password: req.body.password
    }

    User.findOne({ where: { email: loginObj.email } })
      .then(data => {
        if (!data) {
          res.status(401).json({ message: 'Invalid email / password' })
        }
        const match = comparePassword(loginObj.password, data.password)
        if (match) {
          const payload = {
            id: data.id,
            email: data.email
          }
          const access_token = generateToken(payload)
          res.status(200).json({ access_token: access_token })
        } else {
          res.status(401).json({ message: 'Invalid email / password' })
        }
        res.status(200).json(data)
      })
      .catch(err => {
        next(err)
      })
  }
}

module.exports = UserController