const { User } = require("../models");
const { OAuth2Client } = require("google-auth-library");
const { comparePassword } = require("../helpers/bcrypt");
const { generateToken } = require("../helpers/jwt");

class UserController {
  static register(req, res, next) {
    const newUser = {
      email: req.body.email,
      password: req.body.password,
    };
    User.create(newUser)
      .then((data) => {
        const response = {
          id: data.id,
          email: data.email,
        };
        res.status(201).json(response);
      })
      .catch((err) => {
        next(err);
      });
  }

  static login(req, res, next) {
    const loginObj = {
      email: req.body.email,
      password: req.body.password,
    };

    User.findOne({ where: { email: loginObj.email } })
      .then((data) => {
        if (!data) {
          next({ name: "invalidEmailOrPassword" });
        }
        const match = comparePassword(loginObj.password, data.password);
        if (match) {
          const payload = {
            id: data.id,
            email: data.email,
          };
          const access_token = generateToken(payload);
          res.status(200).json({ access_token: access_token });
        } else {
          next({ name: "invalidEmailOrPassword" });
        }
        res.status(200).json(data);
      })
      .catch((err) => {
        next(err);
      });
  }

  static loginGoogle(req, res, next) {
    const { id_token } = req.body;

    let email = null;
    const client = new OAuth2Client(process.env.GOOGLE_CLIENT_ID);
    client
      .verifyIdToken({
        idToken: id_token,
        audience: process.env.GOOGLE_CLIENT_ID,
      })
      .then((ticket) => {
        const payload = ticket.getPayload();
        email = payload.email;

        return User.findOne({
          where: {
            email,
          },
        });
      })
      .then((user) => {
        if (!user) {
          return User.create({
            email,
            password: Math.random() * 1000 + " random password from google",
          });
        } else {
          return user;
        }
      })
      .then((user) => {
        const payload = { email: user.email, id: user.id };
        const access_token = generateToken(payload);
        res.status(200).json({ access_token });
      })
      .catch((err) => {
        next(err);
      });
  }
}

module.exports = UserController;
