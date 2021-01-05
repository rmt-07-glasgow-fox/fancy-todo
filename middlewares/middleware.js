//required models and tokenHelper
const { User, Todo } = require('../models')
const { checkToken } = require('../helpers/jwt')

// authentication -> to see todo, user must login first
function authentication(req, res, next) {
  try {
    //the token is stored in the header
    let decoded = checkToken(req.header.access_token)

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
  try {

  }
  catch {
    
  }
}

module.exports = {
  authentication,
  authorization
}
