const {cekToken} = require('../helpers/jwt')
const { User,Todo } = require('../models') 

function authenticate (req,res,next) {
    try{
     let decoded = cekToken(req.headers.access_token)
     // console.log(decoded)
     User.findOne({ where : { email: decoded.email}})
     .then (find => {
         if(!find) {
             res.status(401).json({ message: 'you are not login, please login first'})
         } else {
            //  req.user = find
             req.user = {id: find.id}
             next()
         }
     }).catch(err => {
         res.status(500).json({ message: err.message})
     })
    }catch(err){
     res.status(400).json({message: err.message})
    }
 }


function authorize (req, res, next) {
    Todo.findOne({where : { id: req.params.id}})
    .then(data => {
        if(data.user_id === req.user.id) {
            next()
        }
        else {
            res.status(401).json({message: 'todo not match'})
        }
    })
    .catch(err => {
        res.status(500).json({message: err.message})
    })
}
 module.exports = {authenticate,authorize}