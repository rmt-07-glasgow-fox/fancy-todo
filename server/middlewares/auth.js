const {User, Todo} = require('../models/index')
const {cekToken} = require('../helpers/jwt')

function authentication(req, res, next){
    try{
        // let header = req.headers.accessToken
        let decoded = cekToken(req.headers.access_token)
        //console.log(decoded)
        User.findOne({where: {email: decoded.email}})
        .then(data =>{
            //console.log(data)
            if(!data){
                return res.status(401).json({message: `please login first`})
            }else {
                req.user = {
                    id: data.id,
                    email: data.email
                }
                next()
            }
        })
        .catch(err =>{
            return res.status(500).json({message: err.message})
        })
    }catch(err){
        console.log(err)
        return res.status(400).json({message: err.message})
    }
}

function authorization(req, res, next){
    Todo.findOne({where:{id: req.params.id}})
    .then(data =>{
        if(!data || data.userId !== req.user.id){
            return res.status(401).json({message: `you dont have any access`})
        }else {
            next()
        }
    })
    .catch(err =>{
        return res.status(500).json(err)
    })
}

module.exports = {
    authentication,
    authorization
}