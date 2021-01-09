const {OAuth2Client} = require('google-auth-library');
const { User } = require('../models');
const { comparePwd } = require('../helpers/bcryptjs');
const { generateToken } = require('../helpers/jwt');

class UserController {
  static registerUser(req, res, next) {
    const { name, email, password } = req.body;
    const newUser = { name, email, password };

    User.create(newUser)
      .then((registeredUser) => {
        const registered = {
          id: registeredUser.id,
          email: registeredUser.email,
        };
        return res.status(201).json(registered);
      })
      .catch((err) => {
        next(err);
      });
  }

  static loginUser(req, res, next) {
    const { email, password } = req.body;
    
    User.findOne({ where: { email } })
      .then((user) => {
        if (user) {
          const matched = comparePwd(password, user.password);
          if (matched) {
            const payload = { id: user.id, email: user.email };
            const accessToken = generateToken(payload);
            return res.status(200).json({ access_token: accessToken });
          } else {
            next({ message: "passEmailNotMatched"});
          }
        } else {
          next({ message: "passEmailNotMatched"})
        }
      })
      .catch((err) => {
        next(err);
      });
  }

  static loginGoogle(req, res, next) {
    const { id_token } = req.body
    const client = new OAuth2Client(process.env.GOOGLE_CLIENT_ID);
    let payloadGoogle

    client.verifyIdToken({
        idToken: id_token,
        audience: process.env.GOOGLE_CLIENT_ID
      })
      .then(ticket => {
        payloadGoogle = ticket.getPayload();
        return User.findOne({where: {email: payloadGoogle.email}})
      })
      .then(user => {
        if (!user) {
          return User.create({
            name: payloadGoogle.name,
            email: payloadGoogle.email,
            password: (Math.random() * 1e8).toString().slice(0, 7)
          }) 
        } else {
          return user
        }
      })
      .then(user => {
        let payloadUser = {
          id: user.id,
          email: user.email
        }
        const accessToken = generateToken(payloadUser);
        return res.status(200).json({ access_token: accessToken });
      })
      .catch(err => {
        next(err)
      })
  }

}

module.exports = UserController;
