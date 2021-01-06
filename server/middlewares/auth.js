const {User, Todo} = require('../models/index')
const {cekToken} = require('../helpers/jwt')

function authentication(req, res, next){
    try{
        let decoded = cekToken(req.headers.access_token)
        //console.log(decoded)
        User.findOne({where: {email: decoded.email}})
        .then(data =>{
            //console.log(data)
            if(!data){
                next({name: 'accessDenied'})
            }else {
                req.user = {
                    id: data.id,
                    email: data.email
                }
                next()
            }
        })
        .catch(err =>{
            next(err)
        })
    }catch(err){
        //console.log(err)
        next(err)
    }
}

function authorization(req, res, next){
    Todo.findOne({where:{id: req.params.id}})
    .then(data =>{
        //console.log('---then')
        if(!data){
            next({name: 'resourceNotFound'})
        }else if(data.userId !== req.user.id){
            next({name: 'accessDenied'})
        }else {
            next()
        }
    })
    .catch(err =>{
        console.log('----catch')
        next(err)
    })
}

module.exports = {
    authentication,
    authorization
}