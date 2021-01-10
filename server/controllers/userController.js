const {User} = require("../models")
const {comparePass} = require("../helper/bcrypt")
const {generateToken} = require("../helper/jwt")
// const {OAuth2Clint, OAuth2Client} = require("google-auth-library")
// const client = new OAuth2Client(process.env.CLIENT_ID)

class Controller {
  static async login(req, res, next) {
    try {
      const data = { 
        email: req.body.email,
        password: req.body.password
      }
      const user = await User.findOne({where: {email: data.email}})
      if (!user) {
        throw {
          status: 400,
          messafe: `Email does not exist`
        }
      } else {
        if (comparePass(data.password, user.password)) {
          const access_token = generateToken({id: user.id, email: user.email})
          res.status(200).json({access_token})
        } else {
          throw {
            status: 400,
            message: "Wrong Password"
          }
        }
      }
    } catch (err) {
      next (err)
    }
  }

  static async register(req, res, next) {
      console.log(`masuk`);
    try {
      const data = {
        email: req.body.email, 
        password: req.body.password
      }
      const user = await User.create(data)
      res.status(200).json({id: user.id, email: user.email})
    } catch (err) {
      next (err)
    }
  }
}

module.exports = Controller