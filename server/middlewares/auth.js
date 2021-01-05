const { User } = require ('../models/index')
const { checkToken } = require ('../helper/jwt')
const { Todo } = require ('../models/index')

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

async function authorize (req, res, next) {
  try {
    let data = await Todo.findOne ({
      where: {
        id: req.params.id
      }
    })
    console.log (data)
    if (data.user_id === +req.user) {
      next ()
    } else {
      res.status(401).json({ message: 'Not authorized'})
    }
  } catch (err) {
    res.status(500).json({ message: err.message})
  }
}

module.exports = {
  authenticate,
  authorize
}