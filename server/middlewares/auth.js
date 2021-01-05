const { User, ToDo } = require('../models')
const verifyToken = require('../helpers/jwtHelper').verifyToken

const authentication = async (req, res, next) => {
  try {
    if(req.headers.access_token){
      let decryptedToken = verifyToken(req.headers.access_token)
      let user = await User.findOne({
        where: {
          email: decryptedToken.email
        }
      })
      if(user){
        req.userData = user
        next()
      } else {
        next({
          status: 401
        })
      }
    }else{
      next({
        status: 401
      })
    }
  } catch (err) {
    next({
      status: 500,
      data: err
    })
  }
}

const authorize = async (req, res, next) => {
  let id = req.params.id
  try {
    let task = await ToDo.findOne({
      where:{
        id
      }
    })
    if(!task || task.UserId !== req.userData.id){
      next({
        status: 401
      })
    }else{
      next()
    }
  } catch (err) {
    res.status(500).json({
      message: err.message
    })
  }
}

module.exports = {
  authentication,
  authorize
}