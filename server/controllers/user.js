const {
  OAuth2Client
} = require("google-auth-library");
const {
  User
} = require('../models');
const {
  comparePassword
} = require('../helpers/bcrypt');
const {
  generateToken
} = require('../helpers/jwt');

class UserController {
  static register(req, res, next) {
    const {
      email,
      password
    } = req.body;
    const newUser = {
      email,
      password
    };

    User
      .create(newUser)
      .then(result => {
        return res.status(201).json({
          id: result.id,
          email: req.body.email
        });
      })
      .catch(err => {
        next(err);
      });
  }

  static login(req, res, next) {
    const {
      email,
      password
    } = req.body;

    User
      .findOne({
        where: {
          email
        }
      })
      .then(user => {
        if (!user) {
          return next({
            name: "InvalidEmail"
          });
        }
        const truePassword = comparePassword(password, user.password);
        if (!truePassword) {
          return next({
            name: "InvalidPassword"
          });
        }
        const payload = {
          id: user.id,
          email: user.email
        };
        const access_token = generateToken(payload);
        req.headers.access_token = access_token;
        return res.status(200).json({
          access_token
        });
      })
      .catch(err => {
        next(err)
      });
  }

  static loginGoogle(req, res, next) {
    const {
      id_token
    } = req.body;
    const client = new OAuth2Client(process.env.GOOGLE_CLIENT_ID);
    client.verifyIdToken({
        idToken: id_token,
        audience: process.env.GOOGLE_CLIENT_ID,
      })
      .then(ticket => {
        const payload = ticket.getPayload();
        // console.log(payload);

        email = payload.email;

        return User.findOne({
          where: {
            email
          }
        })
      })
      .then(user => {
        if (!user) {
          return User.create({
            email,
            password: Math.random() * 900 + "randomGooglepaswd"
          })
        } else {
          return user;
        }
      })
      .then(user => {
        const payload = {
          id: user.id,
          email: user.email,
        };
        // console.log(payload);

        const access_token = generateToken(payload);
        req.headers.access_token = access_token;
        return res.status(200).json({
          access_token
        });

      })
      .catch(err => {
        next(err);
      })
    // const userid = payload['sub'];

  }
}

module.exports = UserController;