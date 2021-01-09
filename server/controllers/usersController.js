const { User } = require('../models')
const { hashPassword, comparePassword } = require('../helpers/bcrypt')
const { generateToken } = require('../helpers/jwt')
const { OAuth2Client } = require('google-auth-library');


class usersController {
  static register(req, res) {
    let { email, password } = req.body //get
    let input = { email, password } //ready to input
    console.log('Controller: register triggered', input);

    User.create(input)
    .then((data) => {
      console.log('Controller: register success', data);
      res.status(201).json(email)
    })
    .catch((err) => {
      // console.log('Controller: register error', err);
      // next(err)
      res.status(400).json(err.message)
    })
  }

  static login(req, res) {
    let { email, password } = req.body
    console.log(`LOGIN`);

    User.findOne({where:{email:email}})
    .then((data) => {
      //check if the email exist
      if (!data) {
        console.log('Controller: login, email not found');
        return res.status(404).json({message: "Invalid email/Email not found"})
      }
      //find the email and compare its password
      let isPassValid = comparePassword(password, data.password)
      if (isPassValid) {
        //initialize payload
        let payload = {id:data.id, email:data.email}
        //request access token
        let access_token = generateToken(payload)
        return res.status(200).json({access_token:access_token})
      }
      return res.status(400).json({message: "Invalid password"})
    })
    .catch((err) => {
      res.status(400).json(err)
    })
  }

  static loginGoogle(req, res) {
    let email
    let id_token = req.body.id_token
    // console.log(req.body.id_token);
    // console.log(id_token);
    const client = new OAuth2Client(process.env.GOOGLE_CLIENT_ID);

    client.verifyIdToken({
      idToken: id_token,
      audience: process.env.GOOGLE_CLIENT_ID,
    })
    .then(ticket => {
      const payload = ticket.getPayload();
      // console.log(payload);
      email = payload.email
      return User.findOne({
        where: {
          email
        }
      })
    })
    .then((user) => {
      //find the user, if the user doesnt exist, create a new one
      if (!user) {
        // console.log('user doesnt exist');
        let input = {email: email, password: Math.ceil(Math.random()*1000000)+'rhs'}
        console.log(input);
        return User.create(input)
      } else {
        // console.log('if exist, return the user');
        return user
      }
    })
    .then((user) => {
      console.log('then3');
      //generate the jwt
      const payload = {
        id: user.id,
        email: user.email
      }
      let access_token =  generateToken(payload)
      console.log(access_token);
      return res.status(200).json({
        access_token
      })
    })
    .catch(err => {
      // next(err)
      res.status(400).json(err)
    })
  }
}

module.exports = usersController