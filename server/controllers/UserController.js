const { User } = require('../models')
const { comparePwd } = require('../helpers/bcryptjs')
const { generateToken } = require('../helpers/jwt')

class UserController {
  static registerUser(req, res, next) {
    const {name, email, password} = req.body
    const newUser = {name, email, password}
    
    User.create(newUser)
    .then(newUser => {
      const registered = {id: newUser.id, email: newUser.email}
      console.log(registered)
      return res.status(201).json(registered)
    })
    .catch(err => {
      next(err)
    })
  }

  static loginUser(req, res, next) {
    const {email, password} = req.body
    
    User.findOne({where: {email}})
    .then(user => {
      if (!user) {
        next({name: 'passEmailNotMatched'})
      } else {
        const matched = comparePwd(password, user.password)
        if (matched) {
          const payload = {id: user.id, email: user.email}
          const accessToken = generateToken(payload)
          return res.status(200).json({accessToken})
        } else {
          next({name: 'passEmailNotMatched'})
        } 
      }
    }) 
    .catch(err => {
      console.log(err)
      next(err)
    })
  }
}
 
module.exports = UserController
