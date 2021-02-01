const { User } = require('../models');
const { comparePassword } = require('../helpers/bcrypt.js');
const { generateToken } = require('../helpers/jwt.js');
const { OAuth2Client } = require('google-auth-library');


class userController {
  static registerHandler(req, res, next) {
    const email = req.body.email || null;
    const password = req.body.password || null;
    User.create({ email, password })
      .then(dataUser => {
        const returnDataUser = {
          id: dataUser.id,
          email: dataUser.email
        }
        return res.status(201).json(returnDataUser);
      })
      .catch(err => {
        return next(err)
      });
  }

  static loginHandler(req, res, next) {
    const { email, password } = req.body;
    User.findOne({ where: { email } })
      .then(dataUser => {
        if (!dataUser) {
          throw { name: 'invalidEmailPassword' };
        }
        const matchPassword = comparePassword(password, dataUser.password);
        if (matchPassword) {
          const payload = {
            id: dataUser.id,
            email: dataUser.email
          }
          const access_token = generateToken(payload);
          return res.status(200).json({ access_token });
        } else {
          throw { name: 'invalidEmailPassword' };
        }
      })
      .catch(err => {
        next(err);
      });
  }

  static userGoogleLogin(req, res, next){
    const { id_token } = req.body
    let email
    const client = new OAuth2Client(process.env.GOOGLE_CLIENT_ID);
    client.verifyIdToken({
      idToken: id_token,
      audience: process.env.GOOGLE_CLIENT_ID,
    })
      .then(data => {
        const payload = data.getPayload()
        email = payload.email
        return User.findOne({
          where:{
            email
          }
        })
      })  
      .then(user => {
        if(!user){
          return User.create({
            email,
            password: (Math.random()*1000+`${process.env.JWT_SECRET}`).toString()
          })
        }else{
          return user
        }
      })
      .then(data => {
        let access_token = generateToken({
          id: data.id,
          email: data.email
        })
        res.status(200).json({
          access_token,
          userData: {
            email: data.email
          }
        })
      })
      .catch(err => {
        next(err)
      })
  }
 
}

module.exports = userController