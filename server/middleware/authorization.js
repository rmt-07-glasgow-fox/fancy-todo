const { TodoList } = require("../models")

//change to async await

async function authorUser (req, res, next) {
    let id = +req.params.id

    try {
        const todo = await TodoList.findByPk({where : 
            {id : id}
        })

        if(!todo) {
            res.status(404).json({
                message : 'Error not found'
            })
        } else {
            
            if(todo.user_id == req.loginUser.id) {
                next()
            } else {
                res.status(401),json({
                    message : `You don't have Authorizatrion`
                })
            }
        }

    } catch (err) {
        res.status(500).json({
            message : 'error in internal server'
        })
    }



    // TodoList.findByPk(userId)
    // .then(data => {
    //     if(data.user_id === req.loggedInUser.id ) {
    //         next()
    //     } else {
    //         res.status(401).json({
    //             message : 'You dont have authorization'
    //         })
    //     }
    // })
    // .catch(err => {
    //     res.status(404).json({
    //         message : 'Error not Found'
    //     })
    // })
}


module.exports = {
    authorUser
}