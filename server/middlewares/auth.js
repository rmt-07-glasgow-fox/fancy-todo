const {cekToken} = require('../helpers/jwt')
const {User, Todo} = require('../models')


const authentication = async (req, res, next) =>  {
  try {
    let decoded = cekToken(req.headers.access_token)
    let user = await User.findOne({where: {email: decoded.email}})

    if (!user) {
      next({name: 'loginFirst'})
    } else {
      let currentUser = {
        id: user.id,
        email: user.email
      }
      req.currentUser = currentUser
      next()
    }
  } catch(error) {
    // res.status(400).json({msg: error.message})
    next(error)
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

    if (todo.UserId != req.currentUser.id) {
      // res.status(401).json({msg: 'You do not have permission'})
      next({name: 'notAuthorize'})
    } else if (!todo) {
      next({name: 'notFound'})
    } else {
      next()
    }
  } catch(error) {
    // res.status(500).json({msg: error})
    next(error)
  }
}

module.exports = {authentication, authorize}