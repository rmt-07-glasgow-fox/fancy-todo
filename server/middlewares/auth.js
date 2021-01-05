const {cekToken} = require('../helpers/jwt')
const {User, Todo} = require('../models')


const authentication = async (req, res, next) =>  {

  try {
    let decoded = cekToken(req.headers.access_token)
    let user = await User.findOne({where: {email: decoded.email}})
    
    if (!user) {
      res.status(401).json({msg: 'Please login first!'})
    } else {
      let currentUser = {
        id: user.id,
        email: user.email
      }
      req.currentUser = currentUser
      next()
    }
  } catch(error) {
    res.status(400).json({msg: error.message})
  }

  // cekToken(req.headers.access_token, (error, decoded) =>{
  //   if(decoded) {
  //     console.log(decoded);
  //     return res.status(200).json({decoded})
  //   } else {
  //     return res.status(400).json({msg: error.message})
  //   }
  // })

}

const authorize = async (req, res, next) => {
  let {id} = req.params

  try {
    let todo = await Todo.findOne({where: {id: id}})

    if (!todo || todo.UserId != req.currentUser.id) {
      res.status(401).json({msg: 'You do not have permission'})
    } else {
      next()
    }
  } catch(error) {
    res.status(500).json({msg: error.message})
  }
}

module.exports = {authentication, authorize}