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
        next(err)
      })
  } catch (err) {
    next(err)
  }
}

const authorize = (req,res,next) => {
    Todo.findOne({
      where: {
        id:req.params.id
      }
    })
      .then(data => {
        // if(!data) throw new Error({name: "NotFound"})
        if(data.UserId !== req.user.id) throw new Error ({name: "Unauthorized"})
        else next()
      })
      .catch(err => {
        err.name = "Unauthorized"
        next(err)
      })
}

module.exports = {authenticate,authorize}