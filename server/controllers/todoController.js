const { Todo } = require('../models')

class TodoController {
    static async fetch(req, res, next) {
        try {
            const todoList = await Todo.findAll({
                where: {
                    UserId: req.loggedInUser.id
                },
                order: [['status', 'DESC']]
            })
            if(todoList) {
                res.status(200).json(todoList)
            }
            else {
                throw {
                    status: 404,
                    message: 'Todo not found'
                }
            }
        }
        catch(error) {
            next(error)
        }
    }

    static async add(req, res, next) {

    }
}

module.exports = TodoController