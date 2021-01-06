const { ToDo } = require('../models')

async function authorization(req, res, next){
    console.log(req.loggedInUser);
    try {
        const { id } = req.params
        // console.log(req.params.id);
        // console.log("haloo");
        // console.log('authorization berhasil')
    
        let result = await ToDo.findByPk(id)
        if(!result){
            throw { msg: 'ToDo not found', status: 404 }
        }else if (result.UserId == req.loggedInUser.id){
            next()
        }else{
            throw { msg: 'Not Authorize', status: 401 }
        }
    } catch (err) {
        next(err)
    }
    
}

module.exports = authorization