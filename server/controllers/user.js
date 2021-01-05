const { User } = require("../models");
const { checkPassword } = require("../helpers/bcrypt");
const { generateToken } = require("../helpers/jwt");

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
          email: result.email,
        };

        const access_token = generateToken(payload);
        req.headers.access_token = access_token;
        return res.status(200).json({ access_token });
      })
      .catch((err) => {
        next(err)
      });
  }
}

module.exports = UserController;
