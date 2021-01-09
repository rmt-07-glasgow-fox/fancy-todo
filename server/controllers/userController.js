const {OAuth2Client} = require('google-auth-library');
const {User} = require('../models')
const {comparePassword} = require("../helpers/bcrypt")
const {generateToken} = require("../helpers/jwt")

class UserController {
  static register(req,res,next) {
    const {email,password} = req.body
    User.create({
      email, password
    })
      .then(data => {
        const result = {
          id: data.id,
          email: data.email
        }
        return res.status(201).json(result)
      })
      .catch(err => {
        next(err)
      })
  }
  static async login(req,res,next) {
    try {
      const {email,password} = req.body
      const user = await User.findOne({
        where: {
          email:email
        }
      })
      if(!user) {
        throw {
          message: "Invalid email / password"
        }
      }
      const match = comparePassword(password, user.password)
      if(match) {
        const payload = {
          id: user.id,
          email: user.email
        }
        const access_token = generateToken(payload)
        return res.status(200).json({
          access_token: access_token
        })
      } else {
        throw {
          message: "Invalid email / password"
        }
      }
    }
    catch(err) {
      next(err)
    }
  }
  static googleSignIn(req,res,next) {
    const {id_token} = req.body;
    let email = null;
    const client = new OAuth2Client(process.env.GOOGLE_CLIENT_ID);
    client.verifyIdToken({
      idToken: id_token,
      audience: process.env.GOOGLE_CLIENT_ID
    })
    .then(ticket => {
      const payload = ticket.getPayload();
      email = payload.email;
      return User.findOne({
        where: {
          email
        }
      })
    })
    .then(user => {
      if(!user) {
        return User.create({
          email,
          password: `${Math.floor(Math.random()*1000)}secret`
        });
      } else {
        return user
      }
    })
    .then(user => {
      console.log('===================');
      console.log(user);
      console.log('===================');
      const payload = {email: user.email, id:user.id}
      const access_token = generateToken(payload)
      res.status(200).json({access_token})
    })
    .catch(err => {
      next(err)
    })
  }
}

module.exports = UserController