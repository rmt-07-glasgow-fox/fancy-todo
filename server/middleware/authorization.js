const { TodoList } = require("../models")

function authorization (req, res, next) {
    let userId = +req.params.id
    
    TodoList.findByPk(userId)
    .then(data => {
        if(data.user_id === req.loggedInUser.id ) {
            next()
        } else {
            res.status(401).json({
                message : 'You dont have authorization'
            })
        }
    })
    .catch(err => {
        res.status(404).json({
            message : 'Error not Found'
        })
    })
}


module.exports = {
    authorization
}