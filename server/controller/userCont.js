const { User } = require('../models')
const { compare } = require('../helper/bcrypt')
const { generateToken } = require('../helper/jwt')

class Controller {

  static register (req, res, next) {
    let { email, fullName, username, password } = req.body
    User.create({ email, fullName, username, password }, {returning: true})
    .then(data => {
      let { id, email, username } = data
      res.status(201).json({id, email, username})
    })
    .catch(err => {
      console.log(err)
      next(err)
    })
  }

  static login (req, res, next) {
    let { email, password } = req.body
    let userData
    User.findOne({where: {email: email}})
    .then(user => {
      if (!user) {
        throw ({message: `You're Not Registered`})
      }else {
        userData = user
        return compare(password, user.password)
      }
    })
    .then(result => {
      if (result) {
        let payload = { 
          id: userData.id,
          email: userData.email,
          username: userData.username 
        }
        let accessToken = generateToken(payload)
        req.header.accessToken = accessToken
        res.status(200).json({id: userData.id, email: userData.email, accessToken})
      } else {
        throw ({name: '404'})
      }
    })
    .catch(err => {
      next(err)
    })

  }
}

module.exports = Controller;