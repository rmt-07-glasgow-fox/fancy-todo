const {User} = require('../models')

class Controller {
    static register(req, res){
        const newUser = {
            email: req.body.email,
            password: req.body.password
        }
        User.create(newUser)
        .then(data => {
            res.status(200).json({
                id : data.id,
                email : data.email
            })
        })
        .catch(err => {
            if(err.errors){
                let message = []
                err.errors.forEach(el => {
                    message.push(el.message)
                })
                res.status(400).json({
                    Errors : message
                })
            } else {
                res.status(500).json({message: 'Internal Server Error'})
            }
        })
    }

    static login(req, res){

    }
}


module.exports = Controller 