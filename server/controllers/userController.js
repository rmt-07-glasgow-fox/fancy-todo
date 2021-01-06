const { User } = require('../models/index.js');
const { comparePass } = require('../helpers/bcrypt.js');
const { generateToken } = require('../helpers/jwt.js')

class UserController {
  static async register(req, res) {
    try {
      const { email, name, password } = req.body;
      console.log({name});
      const register = await User.create({ email, name, password })

      return res.status(201).json({ id: register.id, email: register.email, name: register.name })
    } catch (err) {
      return res.status(400).json(err)
    };
  };

  static async login(req, res) {
    try {
      const { email, password } = req.body;
      const user = await User.findOne({ where: { email } });

      if (!user) {
        throw ({ 'message': 'Invalid Email or Password' });
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
        throw ({ 'message': 'Invalid Email or Password' });
      };
    } catch (err) {
      return res.status(401).json(err);
    };
  };
};

module.exports = UserController;