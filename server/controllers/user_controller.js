const { comparePassword } = require('../helpers/byecrypt')
const { generateToken } = require('../helpers/jwt')
const {User} = require('../models')

class UserController {
  static async signup(req, res) {
    
    let {email, password} = req.body

    try {
      let user = await User.create({email, password})
      
      let userInstance = {
        id: user.id,
        email: user.email
      }

      return res.status(201).json(userInstance)
    } catch(error) {
      if (error) {
        let msg = error.errors.map((err) => err.message)
        return res.status(400).json(msg)
      } else {
        return res.status(500).json('Internal server error')
      }
    }
  }

  static async signin(req, res) {
    let {email, password} = req.body

    try {
      let user = await User.findOne({
        where: {
          email: email
        }
      })

      if (!user) {
        // return res.status(401).json({
        //   msg: 'Invalid email / password'
        // })
        throw {msg: 'Invalid email / password'}
      }

      const isMatch = comparePassword(password, user.password)

      if (isMatch) {
        const payload = {
          id: user.id,
          email: user.email
        }

        const access_token = generateToken(payload)
        return res.status(200).json({access_token})
        
      } else {
        // res.status(401).json({
        //   msg: 'Invalid email / password'
        // })
        throw {msg: 'Invalid email / password'}
      }

      // return res.status(200).json(user)
    } catch(error) {
      return res.status(401).json(error)
    }
  }
}

module.exports = UserController