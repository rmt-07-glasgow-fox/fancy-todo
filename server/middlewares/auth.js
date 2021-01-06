const { cekToken } = require('../helpers/jwt')
const { User } = require('../models')

async function authenticate (req, res, next){
  console.log('masuk proses authentikasi')
  //cara cek authentikasinya adalah dengan mengecek token
  try {
    let token = req.headers.access_token
    let decoded = cekToken(token)
    console.log(decoded, 'ini decoded')
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

module.exports = { authenticate }