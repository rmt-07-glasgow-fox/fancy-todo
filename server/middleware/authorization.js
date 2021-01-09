const { TodoList } = require("../models")

//change to async await

async function authorUser (req, res, next) {
    let id = +req.params.id

    try {
        const todo = await TodoList.findByPk({where : 
            {id : id}
        })

        if(!todo) {

            throw {
                status : 404,
                message : 'Error not found'
            }
        } else {
            
            if(todo.user_id == req.loginUser.id) {
                next()
            } else {
                throw {
                    status : 401,
                    message : `You dont dont't have Authorization`
                }
            }
        }

    } catch (err) {
        next(err)
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