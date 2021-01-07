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
        if (!user) {
          next({ name: 'passEmailNotMatched' });
        } else {
          const matched = comparePwd(password, user.password);
          if (matched) {
            const payload = { id: user.id, email: user.email };
            const accessToken = generateToken(payload);
            return res.status(200).json({ access_token: accessToken });
          }
          next({ name: 'passEmailNotMatched' });
        }
      })
      .catch((err) => {
        next(err);
      });
  }
}

module.exports = UserController;
