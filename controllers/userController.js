const { User } = require('../models');
const { comparePassword } = require('../helpers/bcrypt.js');
const { generateToken } = require('../helpers/jwt.js');

class UserController {
  static async register(req, res) {
    try {
      const {email, password} = req.body;
      const newUser = {email, password};
      const createdUser = await User.create(newUser);
      const response = {
        id: createdUser.id,
        email: createdUser.email
      };
      res.status(201).json(response)
    } catch (err) {
      res.status(400).json(err);
    }
  }

  static async login(req, res) {
    try {
      const {email, password} = req.body;
      const user = await User.findOne({
        where: {email}
      });
      
      if(!user) {
        let message = 'Invalid email / password';
        return res.status(401).json({message});
      }

      const match = comparePassword(password, user.password);

      if(!match) {
        let message = 'Invalid email / password';
        return res.status(400).json({message});        
      }
       
      const payload = {
        id: user.id,
        email: user.email
      }        
      const access_token = generateToken(payload);
      return res.status(200).json({access_token})
    }

    catch(err) {
      return res.status(400).json(err);
    }
  }
}

module.exports = UserController;