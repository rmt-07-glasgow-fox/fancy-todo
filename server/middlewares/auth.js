const {User, Todo} = require("../models")
const {checkToken} = require("../helpers/jwt")

const authenticate = (req,res,next) => {
  try {
    let decoded = checkToken(req.headers.access_token)
    User.findOne({
      where: {
        email: decoded.email
      }
    })
      .then(find => {
        if(!find) res.status(401).json({message: `Please login first`})
        else {
          req.user = find
          next()
        }
      })
      .catch(err => {
        res.status(500).json({ message: err.message })
      })
  } catch (err) {
    res.status(400).json({message: err.message})
  }
}

const authorize = (req,res,next) => {
    Todo.findOne({
      where: {
        id:req.params.id
      }
    })
      .then(data => {
        if(!data || data.UserId !== req.user.id) res.status(401).json({message: "Unauthorized Action"})
        else next() 
      })
      .catch(err => {
        res.status(500).json({message: err.message})
      })
}

module.exports = {authenticate,authorize}