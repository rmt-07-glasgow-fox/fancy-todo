const { User } = require('../models');
const { comparePassword } = require('../helpers/bcrypt.js');
const { generateToken } = require('../helpers/jwt.js');

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
}

module.exports = userController