const { User } = require('../models');
const { comparePassword } = require('../helpers/bcrypt.js');
const { generateToken } = require('../helpers/jwt.js');
const user = require('../models/user');

class userController {
  static registerHandler(req, res) {
    const { email, password } = req.body;
    User.create({ email, password })
      .then(dataUser => {
        const returnDataUser = {
          id: dataUser.id,
          email: dataUser.email
        }
        return res.status(201).json(returnDataUser);
      })
      .catch(err => {
        if (err.message) {
          return res.status(500).json({ message: err.message });
        }
        return res.status(400).json(err);
      });
  }

  static loginHandler(req, res) {
    const { email, password } = req.body;
    User.findOne({ where: { email } })
      .then(dataUser => {
        if (!dataUser) {
          throw { message: 'Invalid email / password' };
        }
        const matchPassword = comparePassword(password, dataUser.password);
        if (matchPassword) {
          const payload = {
            id: user.id,
            email: user.email
          }
          const access_token = generateToken(payload);
          return res.status(200).json({ access_token });
        } else {
          throw { message: 'Invalid email / password' };
        }
      })
      .catch(err => {
        return res.status(401).json(err)
      });
  }
}

module.exports = userController