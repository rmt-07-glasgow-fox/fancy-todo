const { comparePassword } = require('../helpers/bcrypt')
const { generateToken } = require('../helpers/jwt')
const { User } = require('../models')
const {OAuth2Client} = require('google-auth-library');

class userController {
  static register(req,res,next){
    const { email, password } = req.body
    User.create({
      email : email || '',
      password : password || ''
    })
    .then(user => {
      res.status(201).json({
        id:user.id,
        email:user.email
      })
    })
    .catch(err => {
      next(err)
    })
  }

  static login(req,res,next){
    const { email, password } = req.body
    User.findOne({
      where:{email : email || ''}
    })
    .then(user => {
      if(user){
        const match = comparePassword(password ? password : '', user.password)
        if(match){
          const payload = {
            id:user.id,
            email:user.email
          }
          const accessToken = generateToken(payload)
          return res.status(200).json({
            accessToken
          })
        }else{
          next({name:"errorLogin"})
        }
      }else{
        next({name:"errorLogin"})
      }
    })
  }

  static async loginGoogle(req,res,next){
    const { id_token } = req.body

    const client = new OAuth2Client(process.env.GOOGLE_CLIENT_ID);
    try{
      const ticket = await client.verifyIdToken({
        idToken: id_token,
        audience: process.env.GOOGLE_CLIENT_ID,
      });
      const payload_google = ticket.getPayload();
      const email = payload_google.email

      const user = await User.findOne({where:{email}})
      if(!user){
        const user = await User.create({
            email : email,
            password : (Math.random()+3289189).toString()
        })
        const payload = {
          id:user.id,
          email:user.email
        }
        const accessToken = generateToken(payload)
        return res.status(200).json({
          accessToken,
          user_name: payload_google.name
        })
      }else{
        const payload = {
          id:user.id,
          email:user.email
        }
        const accessToken = generateToken(payload)
        return res.status(200).json({
          accessToken,
          user_name: payload_google.name
        })
      }
    }catch(err){
      next(err)
    }
  }
}

module.exports = userController