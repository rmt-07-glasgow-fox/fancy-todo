const { User } = require('../models');
const { comparePassword } = require('../helpers/bcrypt.js');
const { generateToken } = require('../helpers/jwt.js');
const { OAuth2Client } = require('google-auth-library');
const axios = require('axios');


class UserController {
  static async register(req, res, next) {
    try {
      const {email, password} = req.body;
      const newUser = {email, password};
      const createdUser = await User.create(newUser);
      const response = { message: 'Success create user' };
      res.status(201).json(response)
    }
    catch (err) {
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
      next(err);
    }
  }

  static async loginGoogle (req, res, next) {
    const { idToken } = req.body;
    const client = new OAuth2Client(process.env.CLIENT_ID);
    async function verify() {
      const ticket = await client.verifyIdToken({
          idToken,
          audience: process.env.CLIENT_ID,
      });
      const payload = ticket.getPayload();
      const userid = payload['sub'];
      const email = payload.email;
      const userFound = await User.findOne({ where: { email } });
      if(userFound) {
        const payload = {
          id: userFound.id,
          email: userFound.email
        } 
      }
      else {
        const password = Math.random() * 1000 + ' random password';
        const newUser = { email, password};
        const createdUser = await User.create(newUser);
        const payload = {
          id: createdUser.id,
          email: createdUser.email
        } 
      }
      const getQuote = await axios.get('http://api.quotable.io/random?tags=famous-quotes');     
      const quote = {
        content: getQuote.data.content,
        author: getQuote.data.author
      }
      const access_token = generateToken(payload);
      return res.status(200).json({access_token, email, quote});
    }
    verify().catch(err => {
      console.log(err);
      next(err);
    });
  }
}

module.exports = UserController;