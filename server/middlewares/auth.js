const { cekToken } = require('../helpers/jwt')
const { User, Todo } = require('../models')

async function authenticate (req, res, next){
  console.log('masuk proses authentikasi')
  //cara cek authentikasinya adalah dengan mengecek token
  try {
    let token = req.headers.access_token
    let userParams = cekToken(token)
    // console.log(userParams, 'ini userParams')
    //jangan langsung di next, karena masih ada kemungkinan untuk dibobol
    console.log(userParams.email)
    if(!userParams.email){
      //res.status(401).json({message: 'No Email Inside Token'})
      throw ({name: 'InvalidTokenFormat'})
    }
    let find = await User.findOne({
      where: {email : userParams.email}
    })
    if(!find){
      console.log('masuk find')
      //res.status(401).json({message: 'Email Not Registered, please register first'})
      throw ({name: 'EmailNotRecognized'}) //kalo mau dites, generate tokennya diluar api sendiri
    } 
    req.user = find //ini buat ngebawa data find ke controller. aksesnya pake req.user
    next()
  } catch(err){
    next(err)
    // return res.status(400).json({message: `${err.message}`})
  }
}

async function authorize(req, res, next){
  console.log('masuk authorize')
  try {
    // console.log(req.user, '<<<< ini dalem authorize')
    console.log(req.params.id)
    let todo = null
    todo = await Todo.findOne({
      where: {id: req.params.id}
    })
    if(todo && (req.user.id !== todo.user_id) ){// tambahin error 404 kalo todo tidak ketemu
      // res.status(401).json({message: 'error not authorized'})
      throw ({name: 'NotAuthorized'})
    } else if(!todo){
      // res.status(404).json({message: 'data not found'})
      throw({name: 'DataNotFound'})
    } else {
      next()
    }
  } catch (err) {
    // res.status(500).json({message: 'internal server error'})
    next(err)
  }
}

module.exports = { authenticate , authorize }