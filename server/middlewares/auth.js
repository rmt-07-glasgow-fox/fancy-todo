const {cekToken} = require('../helpers/jwt')
const { User,Todo } = require('../models') 

function authenticate (req,res,next) {
    try{
     let decoded = cekToken(req.headers.access_token)
     // console.log(decoded)
     User.findOne({ where : { email: decoded.email}})
     .then (find => {
         if(!find) {
             next ({code: 401, origin: 'authenticate'})
         } else {
            //  req.user = find
             req.user = {id: find.id}
             next()
         }
     })
     .catch(err => {
         next ({code: 500})
     })
    } catch(err) {
        next({ code: 404, msg: err.message })
    }
 }

function authorize (req, res, next) {
    Todo.findOne({where : { id: req.params.id}})
    .then(data => {
        if(data.user_id === req.user.id) {
            next()
        }
        else {
            next({ code: 401, origin:'authorize' })
        }
    })
    .catch(err => {
        next({code: 500})
    })
}
 module.exports = {authenticate,authorize}