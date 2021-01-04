const {Todo} = require('../models')

class TodoController {
    static todoPage (req, res){
        // res.send('hello world')
        Todo.findAll()
        .then(data => {
            res.status(200).json(data)
        })
        .catch(err => {
            res.status(500).json({message:'internal server error'})
        })
    }

    static createTodo (req,res){
        const todoObj = {
            title : req.body.title,
            description: req.body.description,
            status: req.body.status,
            due_date: req.body.due_date
        }
        Todo.create(todoObj)
        .then(data => {
            res.status(201).json(data)
        })
        .catch(err => {
            res.status(500).json({message:'internal server error'})
        })
    }
}

module.exports = TodoController