const { User } = require('../models')
const { hashPassword, comparePassword } = require('../helpers/bcrypt')
const { generateToken } = require('../helpers/jwt')

class usersController {
  static register(req, res) {
    let { email, password } = req.body //get
    let input = { email, password } //ready to input

    console.log(input);
    User.create(input)
    .then(() => {
      res.status(201).json(email)
    })
    .catch((err) => {
      res.status(400).json(err)
    })
  }

  static login(req, res) {
    let { email, password } = req.body

    User.findOne({where:{email:email}})
    .then((data) => {
      //check if the email exist
      if (!data) {
        return res.status(400).json("Invalid email")
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
      return res.status(400).json("Invalid password")
    })
    .catch((err) => {
      res.status(400).json(err)
    })
  }
}

module.exports = usersController