const TodoController = require("../controllers/todoController")
const {
  cekToken
} = require("../helpers/jwt")
const {
  User,
  Todo
} = require("../models")


const authentication = (req, res, next) => {
  try {
    let decoded = cekToken(req.headers.access_token)
    User.findOne({
      where: {
        email: decoded.email
      }
    })
    .then(data => {
      if (!data) {
        res.status(401).json({message: "please login first"})
      } else {
        req.user = data
        next()
      }
    })
    .catch(err => {
      res.status(500).json({message: err.message})
    })
    
  } catch (err) {
    res.status(400).json({message: err.message})
  }
}
const authorization = (req, res, next) => {
  let id = req.params.id
  Todo.findByPk(id)
  .then(data => {
    if (data.userId == req.user.id) {
      next()
    } else {
      res.status(401).json( {
        message: "unauthorized"
      })
    } 
  })
  .catch(err => {
    res.status(500).json({
      message: err.message
    })
  })
}



module.exports = {
  authentication,
  authorization,
}