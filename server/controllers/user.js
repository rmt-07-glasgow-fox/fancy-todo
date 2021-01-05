const { User } = require("../models");
const { checkPassword } = require("../helpers/bcrypt");
const { generateToken } = require("../helpers/jwt");

class UserController {
  static register(req, res) {
    const { username, fullName, email, password } = req.body;

    User.create({
      username, fullName, email, password
    })
    .then(result => {
      return res.status(201).json({
        id: result.id,
        username: result.username,
        email: result.email
      })
    })
    .catch(err => {
      if (err.name === "SequelizeValidationError" || err.name === "SequelizeUniqueConstraintError") {
        return res.status(400).json(err.errors);
      }
      return res.status(500).json(err);
    })
  }

  static login(req, res) {
    const { email, password } = req.body;

    User.findOne({ where: { email }})
    .then(result => {
      if (!result) {
        return res.status(401).json({message: "Email / password is not valid"})
      }
      const truePassword = checkPassword(password, result.password);
      // console.log(truePassword);
      if (!truePassword){
        return res.status(401).json({message: "Email / password is not valid"})
      }
      // password benar, maka create token
      const payload = {
        id: result.id,
        username: result.username,
        email: result.email
      }

      const access_token = generateToken(payload)
      return res.status(200).json({ access_token })
    })
    .catch(err => {
      if (err.name === "SequelizeValidationError" || err.name === "SequelizeUniqueConstraintError") {
        return res.status(400).json(err.errors);
      }
      return res.status(500).json(err);
    })
  }
}

module.exports = UserController;
