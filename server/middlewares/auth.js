const { User } = require ('../models/index')
const { checkToken } = require ('../helper/jwt')

async function authenticate (req, res, next) {
  try {
    let decoded = checkToken (req.headers.access_token)
    let find = await User.findOne({
      where: {
        email: decoded.email
      }
    })

    if (!find) {
      res.status(401).json({ message: 'please login first'})
    }else {
      console.log (decoded)
      req.user = find.id
      // console.log (req.user, 'req.user')
      next ()
    }
  } catch (err) {
    res.status(400).json( {message: err.message })
  }
}

module.exports = {
  authenticate
}