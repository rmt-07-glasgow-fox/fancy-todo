const cekToken = require('../helper/cekToken')
const {User, TodoList} = require('../models')

async function authentication (req, res, next) {
    try{
        let decoded = cekToken(req.headers.access_token)
        let find = await User.findOne({where:{email:decoded.email}})
        if(!find){
            next({name:'Forbidden'})
        }else{
            req.user = find
            next()
        }
    }catch(err){
        next({name:'Forbidden'})
    }
}

function authorization (req, res, next){
    TodoList.findOne({where:{id:req.params.id}})
    .then(data=>{
        if(!data){
            next({name:'NotFound'})   
        }else if (data.UserId !== req.user.id){
            next({name:'Unauthorized'})
        }else{
            next()
        }
    })  
    .catch (err=>{
        next(err)
    })    
}

module.exports = {authentication, authorization}