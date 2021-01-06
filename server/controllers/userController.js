const { User } = require('../models');
const { comparePassword } = require('../helpers/bcrypt.js');
const { generateToken } = require('../helpers/jwt.js');
const axios = require('axios');

class UserController {
  static async register(req, res, next) {
    try {
      const {email, password} = req.body;
      const newUser = {email, password};
      const createdUser = await User.create(newUser);
      const response = { message: 'Success create user' };
      res.status(201).json(response)
    } catch (err) {
      next(err);
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
      const getQuote = await axios.get('http://api.quotable.io/random?tags=famous-quotes');     
      const quote = {
        content: getQuote.data.content,
        author: getQuote.data.author
      }
      const access_token = generateToken(payload);
      return res.status(200).json({access_token, email, quote})
    }

    catch(err) {
      return res.status(400).json(err);
    }
  }

  static async loginGoogle () {

  }
}

module.exports = UserController;