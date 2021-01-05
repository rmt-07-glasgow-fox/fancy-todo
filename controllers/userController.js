const {User} = require('../models');
const {comparePassword} = require('../helpers/bcrypt');
const {generateToken} = require('../helpers/jwt')
class Controller {
  static register (req, res) {
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
        res.status(400).json(err.message)
      })
  }
  static login (req, res) {
    let { email, password } = req.body
    User.findOne({
      where: {
        email
      }
    })
    .then(user => {
      if(!user) return res.status(401).json({
        msg: "Invalid Email / Password"
      })

      if(comparePassword(password,user.password)) {
        let payload = {
          id: user.id,
          email: user.email
        }
        let token = generateToken(payload)
        res.status(200).json({access_token: token})
        
      }
      else res.status(401).json("Invalid Email / Password")
    })
    .catch(err => {
      res.status(500).json({
        msg: "Error"
      })
    })
  }
}
module.exports = Controller