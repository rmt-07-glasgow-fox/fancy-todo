const {User} = require('../models')

class Controller{
    static register(req, res){
        let body = req.body
        let data = {
            email: body.email,
            password: body.password
        }
        User.create(data)
        .then(data=>{
            res.status(200).json({id:data.id, email:data.email})
        })
        .catch(err=>{
            res.status(400).json({message: err})
        })
    }
}

module.exports = Controller