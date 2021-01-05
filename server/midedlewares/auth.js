const cekToken = require('../helper/cekToken')
const {User, TodoList} = require('../models')

async function authentication (req, res, next) {
    try{
        let decoded = cekToken(req.headers.access_token)
        let find = await User.findOne({where:{email:decoded.email}})
        if(!find){
            res.status(401).json({message: 'Please login first'})
        }else{
            req.user = find
            next()
        }
    }catch(err){
        res.status(400).json({message: err.message})
    }
}

function authorization (req, res, next){
    TodoList.findOne({where:{id:req.params.id}})
    .then(data=>{
        if(!data || data.UserId !== req.user.id){
            res.status(401).json({message: "Sorry you don't have permision"})
        }else{
            next()
        }
    })  
    .catch (err=>{
        res.status(500).json({message:err.message})
    })    
}

module.exports = {authentication, authorization}