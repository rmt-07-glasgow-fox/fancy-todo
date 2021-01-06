//required models and tokenHelper
const { User, Todo } = require('../models')
const { checkToken } = require('../helpers/jwt')

// authentication -> to see todo, user must login first
function authentication(req, res, next) {
  try {
    //the token is stored in the header
    let decoded = checkToken(req.headers.access_token)

    //search whether an email exist in decoded.email
    User.findOne({
      where:{email: decoded.email}
    })
    .then((data) => {
      if (!data) {
        return res.status(400).json({message: 'You are not logged in!'})
      }
      //if success, add the data to req.user, this will be used to check the id
      req.user = data
      next()
    })
    .catch((err) => {
      res.status(400).json({err})
    })
  }
  catch(err) {
    res.status(400).json({err})
  }
}

// authorization -> to delete/update, user Id must be the same
function authorization(req, res, next) {
  //the userId is stored in token, while the TodoId is in the req.params
  let todoId = +req.params.id //the targeted id that wants to be deleted
  try {
    Todo.findByPk(todoId)
    .then((data) => {
      if (!data) {
        return res.status(404).json({message:"Error 404: todo not found"})
      }
      if (data.UserId === req.user.id) {
        next()
      }
      else {
        return res.status(401).json({message:"Unauthorized"})
      }
    })
  }
  catch(err) {
    return res.status(400).json({message: err.message})
  }
}

module.exports = {
  authentication,
  authorization
}
