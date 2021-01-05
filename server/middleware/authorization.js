const { Todo } = require('../models')

module.exports = (req,res,next) => {
        Todo.findOne({where: {id: req.params.id}})
        .then(data => {
            if(data){
                if (data.UserId == req.loggedInUser.id){
                    next()
                } else {
                    throw {
                        status: 401,
                        message: "you are not authorize with this todo"
                    }
                }
            } else {
                throw {
                    status: 401,
                    message: "you are not authorize with this todo"
                }
            }
        })
        .catch(error => {
            next(error)
        })
}