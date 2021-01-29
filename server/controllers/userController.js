const { OAuth2Client } = require('google-auth-library');

const { compPass } = require('../helpers/bcrypt.js');
const { genToken, chkToken } = require('../helpers/jwt.js')
const { User } = require('../models/index.js');

class UserController {
  static async register(req, res, next) {
    try {
      const { email, name, password } = req.body;
      const register = await User.create({ email, name, password });

      return res.status(201).json({ id: register.id, email: register.email, name: register.name });
    } catch (err) {
      next(err);
    };
  };

  static async login(req, res, next) {
    try {
      const { email, password } = req.body;
      const user = await User.findOne({ where: { email } });

      if (!user) {
        throw ({ 'name': 'InvalidEmailorPass' });
      };

      const chkPass = compPass(password, user.password);

      if (chkPass) {
        const payload = {
          id: user.id,
          email: user.email,
          name: user.name,
          profpic: user.profpic
        };
        const access_token = genToken(payload);

        return res.status(200).json({ access_token });
      } else {
        throw ({ 'name': 'InvalidEmailorPass' });
      };
    } catch (err) {
      next(err);
    };
  };

  static glogin(req, res, next) {
    const { id_token } = req.body;
    const client = new OAuth2Client(process.env.GOOGLE_CLIENT_ID);
    let name, email, profpic;

    client.verifyIdToken({ idToken: id_token, audience: process.env.GOOGLE_CLIENT_ID, })
      .then(ticket => {
        const payload = ticket.getPayload();
        name = payload.name;
        email = payload.email;
        profpic = payload.picture;

        return User.findOne({ where: { email } });
      })
      .then(user => {
        if (!user) {
          return User.create({
            name,
            email,
            profpic,
            password: Math.floor(Math.random() * 999999) + "pass"
          });
        } else {
          return user;
        };
      })
      .then(user => {
        const payload = {
          id: user.id,
          name: user.name,
          email: user.email,
          profpic: user.profpic
        };
        const access_token = genToken(payload);

        return res.status(200).json({ access_token });
      })
      .catch(err => next(err));
  };

  static async getUser(req, res, next) {
    const decode = chkToken(req.headers.access_token);

    try {
      const user = await User.findOne({ where: { id: decode.id } });

      return res.status(200).json({
        id: user.id,
        email: user.email,
        name: user.name,
        profpic: user.profpic
      });
    } catch (err) {
      next(err);
    };
  };
};

module.exports = UserController;