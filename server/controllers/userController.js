const { User } = require('../models')

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

  static login(req, res) {}
}

module.exports = ControllerUser
