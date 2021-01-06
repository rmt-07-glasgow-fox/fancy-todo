const { cekToken } = require('../helpers/jwt')
const { User, Todo } = require('../models')
const user = require('../models/user')

async function authenticate (req, res, next){
  console.log('masuk proses authentikasi')
  //cara cek authentikasinya adalah dengan mengecek token
  try {
    let token = req.headers.access_token
    let decoded = cekToken(token)
    // console.log(decoded, 'ini decoded')
    //jangan langsung di next, karena masih ada kemungkinan untuk dibobol
    let find = await User.findOne({
      where: {email : decoded.email}
    })
    if(!find){
      return res.status(401).json({message: 'Email tidak terdaftar'}) //kalo mau dites, generate tokennya diluar api sendiri
    }
    req.user = find //ini buat ngebawa data find ke controller. aksesnya pake req.user
    next()
  } catch(err){
    return res.status(400).json({message: `${err.message}`})
  }
}

async function authorize(req, res, next){
  console.log('masuk authorize')
  try {
    // console.log(req.user, '<<<< ini dalem authorize')
    console.log(req.params.id)
    let find = await Todo.findOne({
      where: {id: req.params.id}
    })
    if(!find || req.user.id !== find.user_id){
      res.status(401).json({message: 'error not authorized'})
    } else {
      next()
    }
  } catch (err) {
    res.status(500).json({message: 'internal server error'})
  }
}

module.exports = { authenticate , authorize }