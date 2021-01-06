const {User} = require('../models');
const {comparePassword} = require('../helpers/bcrypt');
const {generateToken} = require('../helpers/jwt')
class Controller {
  static register (req, res, next) {
    const params = {
      email: req.body.email,
      password: req.body.password
    }
    User.create(params)
      .then(user => {
        let out = {
          id: user.id,
          email: user.email
        }
        res.status(201).json(out)
      })
      .catch(err => {
        next ({ code: 400, msg: err.message})
      })
  }
  static login (req, res, next) {
    let { email, password } = req.body
    User.findOne({
      where: {
        email
      }
    })
    .then(user => {
      if(!user) return next({ code: 401, origin: 'user'})

      if(comparePassword(password,user.password)) {
        let payload = {
          id: user.id,
          email: user.email
        }
        let token = generateToken(payload)
        res.status(200).json({access_token: token})
        
      }
      else next({ code: 401, origin: 'user'})
    })
    .catch(err => {
      next({ code: 500})
    })
  }
}
module.exports = Controller