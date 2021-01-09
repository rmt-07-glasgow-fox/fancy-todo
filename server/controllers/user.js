const { User } = require('../models')

const { checkHash } = require ('../helpers/hashPassword')
const { generateToken } = require('../helpers/jwt')

class Controller {

  static registerUser(req, res, next) {
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
        next(err)
      })
  }

  static loginUser(req, res, next) {
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
            next({ name: 'Wrong Password' })
          }
        } else {
          next({ name: 'Wrong Email' })
        }
      })
      .catch(err => {
        next(err)
      })
  }
}

module.exports = Controller
