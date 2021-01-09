const { OAuth2Client } = require('google-auth-library');
const { User } = require('../models/index.js');
const { comparePass } = require('../helpers/bcrypt.js');
const { generateToken, checkToken } = require('../helpers/jwt.js')

class UserController {
  static async register(req, res, next) {
    try {
      const { email, name, password } = req.body;
      const register = await User.create({ email, name, password })

      return res.status(201).json({ id: register.id, email: register.email, name: register.name })
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

      const checkPass = comparePass(password, user.password);

      if (checkPass) {
        const payload = {
          id: user.id,
          email: user.email,
          name: user.name
        };
        const access_token = generateToken(payload);
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
    let name;
    let email;

    client.verifyIdToken({ idToken: id_token, audience: process.env.GOOGLE_CLIENT_ID, })
      .then(ticket => {
        const payload = ticket.getPayload();
        name = payload.name;
        email = payload.email;
        return User.findOne({ where: { email } });
      })
      .then(user => {
        if (!user) {
          return User.create({
            name,
            email,
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
          email: user.email
        };
        const access_token = generateToken(payload);
        return res.status(200).json({
          access_token
        });
      })
      .catch(err => next(err));
  };

  //   static async glogin(req, res, next) {
  //     try {
  //       const { id_token } = req.body
  //       let email;
  //       let name;

  //       const client = new OAuth2Client(process.env.GOOGLE_CLIENT_ID);

  //       const ticket = await client.verifyIdToken({
  //         idToken: id_token,
  //         audience: process.env.GOOGLE_CLIENT_ID,
  //       });
  //       const getPayload = ticket.getPayload();
  //       name = getPayload.name;
  //       email = getPayload.email;

  //       const user = await User.findOne({ where: { email } });
  //       console.log(user);

  //       if (!user) {
  //         await User.create({
  //           name,
  //           email,
  //           password: Math.floor(Math.random() * 999999) + "pass"
  //           // TODO: Bug kalau setelah menjalankan ini langsung berhenti di sini
  //         });
  //       };

  //       const payload = {
  //         id: user.id,
  //         name: user.name,
  //         email: user.email
  //       };

  //       const access_token = generateToken(payload);
  //       console.log(access_token);
  //       return res.status(200).json({ access_token });

  //     } catch (err) {
  //       next(err);
  //     };
  //   };

  static async getUser(req, res, next) {
    const decoded = checkToken(req.headers.access_token);

    console.log(decoded)
    try {
      const user = await User.findOne({ where: { id: decoded.id } });

      return res.status(200).json({ id: user.id, email: user.email, name: user.name });
    } catch (err) {
      next(err);
    };
  };
};

module.exports = UserController;