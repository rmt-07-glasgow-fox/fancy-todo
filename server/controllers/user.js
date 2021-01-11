const { User } = require("../models");
const { checkPassword } = require("../helpers/bcrypt");
const { generateToken } = require("../helpers/jwt");
const { OAuth2Client } = require("google-auth-library");

class UserController {
  static register(req, res, next) {
    const { username, fullName, email, password } = req.body;

    User.create({
      username,
      fullName,
      email,
      password,
    })
      .then((result) => {
        return res.status(201).json({
          id: result.id,
          username: result.username,
          fullName: result.fullName,
          email: result.email,
        });
      })
      .catch((err) => {
        next(err);
      });
  }

  static login(req, res, next) {
    const { email, password } = req.body;

    User.findOne({ where: { email } })
      .then((result) => {
        if (!result) {
          return next({
            name: "InvalidEmail",
          });
        }
        const truePassword = checkPassword(password, result.password);
        if (!truePassword) {
          return next({
            name: "InvalidPassword",
          });
        }
        // password benar, maka create token
        const payload = {
          id: result.id,
          username: result.username,
          fullName: result.fullName,
          email: result.email,
        };

        const access_token = generateToken(payload);
        req.headers.access_token = access_token;
        return res.status(200).json({ access_token });
      })
      .catch((err) => {
        next(err);
      });
  }

  static loginGoogle(req, res, next) {
    // console.log(req.body.id_token);
    let username, fullName, email;
    const { id_token } = req.body;
    const client = new OAuth2Client(process.env.OAUTH_GOOGLE_CLIENT_ID);

    client.verifyIdToken({
      idToken: id_token,
      audience: process.env.OAUTH_GOOGLE_CLIENT_ID,
    })
    .then(ticket => {
      const payload = ticket.getPayload();
      // console.log(payload);
      username = payload.name;
      fullName = payload.name;
      email = payload.email;

      return User.findOne({
        where: { email }
      })
    })
    .then(user => {
      if(!user){
        return User.create({
          username,
          fullName,
          email,
          password: Math.random()*1000 + "pass Google"
        })
      }
      else {
        return user;
      }
    })
    .then(user => {
      const payload = {
        id: user.id,
        username: user.username,
        fullName: user.fullName,
        email: user.email,
      };
      // console.log(payload);

      const access_token = generateToken(payload);
      req.headers.access_token = access_token;
      return res.status(200).json({ access_token });
    })
    .catch(err => {
      res.send(err)
      // next(err)
    })
  }
}

module.exports = UserController;
