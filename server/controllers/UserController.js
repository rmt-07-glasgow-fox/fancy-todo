const { User } = require('../models')

class UserController {
  static register(req, res) {
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
        res.status(400).json({ message: err.message })
      })
  }
}

module.exports = UserController