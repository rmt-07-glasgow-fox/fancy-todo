const { TodoList } = require("../models")

//change to async await

async function authorUser (req, res, next) {
    let id = +req.params.id

    try {
        const todo = await TodoList.findByPk(id)

        if(todo) {
            if(todo.UserId == req.loginUser.id) {
                next()
            } else {
                throw {
                    status : 401,
                    message : `You dont't have Authorization`
                }
            }
        } else {
            throw {
                status : 404,
                message : 'error not found'
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