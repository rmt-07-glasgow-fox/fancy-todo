const {User} = require('../models');
const {comparePassword} = require('../helpers/bcrypt.js');
const {generateToken} = require('../helpers/jwt.js');

class UserController {
  static register(req, res) {
    const {email, password} = req.body;
    const newUser = {email, password};
    User.create(newUser)
      .then(user => {
        const response = {
          id: user.id,
          email: user.email
        };
        res.status(201).json(response)
      })
      .catch(err => {
        res.status(400).json(err);
      });
  }

  static async login(req, res) {
    try {
      const {email, password} = req.body;
      const user = await User.findOne({
        where: {email}
      });
      if(!user) {
        return res.status(401).json({
          message: 'Invalid email / password'
        });
      }
      const match = comparePassword(password, user.password);

      if(match) {
        const payload = {
          id: user.id,
          email: user.email
        }        
        const access_token = generateToken(payload);
        return res.status(200).json({access_token})
      } else {
        return res.status(400).json({
          message: 'Invalid email / password'
        });
      }
    }
    catch(err) {
      return res.status(400).json(err);
    }    

  }
}

module.exports = UserController;