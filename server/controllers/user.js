const { User } = require('../models')

const { checkHash } = require ('../helpers/hashPassword')
const { generateToken } = require('../helpers/jwt')

class Controller {

  static registerUser(req, res) {
    let { email, password } = req.body
    let input = { email, password }

    User.create(input)
      .then( user => {
        res.status(201).json({
          id: user.id,
          email: user.email
        })
      })
      .catch(err => {
        res.send('Server Error')
      })
  }

  static loginUser(req, res) {
    let { email, password } = req.body

    User.findOne({
      where: {
        email
      }
    })
      .then( user => {
        if(user) {
          if(checkHash(password, user.password)) {
            res.status(200).json({ accessToken: generateToken({ id: user.id, email: user.email })})
          } else {
            res.status(400).json({ message: 'Wrong email/password' })
          }
        } else {
          res.status(400).json({ message: 'Wrong email/password' })
        }
      })
      .catch(err => {
        console.log(err)
        res.status(500).json({ message: 'Server Error' })
      })
  }
}

module.exports = Controller
