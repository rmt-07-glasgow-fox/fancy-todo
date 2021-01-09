const { checkToken } = require('../helper/jwt')
const { User,ToDo } = require('../models')


function authenticate (req, res, next) {
  try {
    let userParams = checkToken(req.header.accessToken)
    User.findOne({where: {email: userParams.email}})
      .then(user => {
        if (user) {
          if (userParams.email == user.email) {
            let { id, email, username } = user
            req.user = { id, email, username }
            next()
          } else {
            res.status(401).json({message: 'Unauthorized'})
          }
        } else {
          res.status(404).json({message: 'Please Login First'})
        }
      })
      .catch(err => {
        next(err)
      })
  }catch (err) {
    next(err)
  }
}

function authorize (req, res, next) {
  try {
    let id = req.params.id
    let userParams = checkToken(req.header.accessToken)
    ToDo.findByPk(id)
      .then(toDo => {
        if (toDo) {
          if (toDo.UserId == userParams.id){
            next()
          } else {
            res.status(401).json({message: 'Unauthorized'})
          }
        } else {
          throw ({ name: '404'})
        } 
      })
      .catch(err => {
        next(err)
      })
  }catch (err) {
    next(err)
  }
}

module.exports = {authenticate, authorize};