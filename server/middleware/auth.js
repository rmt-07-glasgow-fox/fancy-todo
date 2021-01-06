const { tokenCheck } = require('../helper/jwt')
const { User, Todo } = require('../models')

function authenticate(req, res, next) {
      try{
            let decoded = tokenCheck(req.headers.access_token)
            User.findOne({where: {email: decoded.email}})
                  .then(match => {    
                        if(!match) {
                              res.status(401).json({message: "you must login fisrt"})
                        } else {
                              req.user = match
                              next()
                        }
                  })
                  .catch(err => {res.status.json({message: err.message})})
      }catch (err) { 
            res.status(400).json(err)
      }
}

function authorize(req, res, next) {
      Todo.findOne({where: {id: req.params.id}})
            .then(todo => {
                  if(todo.UserId === req.user.id){
                       
                        next()
                  } else {
                        
                        res.status(401).json({message: "bukan punyanya"})
                  }
            })
            .catch(err => {
                  
                        res.status(404).json({message: "gak ketemu"})
                  
            })
}

module.exports = {authenticate, authorize}