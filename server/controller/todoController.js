const { todo } = require('../models/index')

class todoController {
    static getAllTodo (req, res) {
        todo.findAll()
        .then(todo => {
            res.status(200).json(todo)
        })
        .catch(err => {
            res.status(500).json({msg:'Internal Server Error'})
        })
    }

    static createTodo(req, res) {
        let newTodo = {
            title: req.body.title,
            description: req.body.description,
            status: req.body.status,
            due_date: req.body.due_date
        }

        console.log(newTodo);

        todo.create(newTodo) 
        .then(todo => {
            res.status(201).json(todo)
        })
        .catch(err => {
            console.log(err);
            res.status(500).json({msg:'Internal Server Error'})
        })
    }

    static findOne(req, res) {
        let id = +req.params.id

        todo.findOne(id)
        .then(todo => {
            res.status(200).json(todo)
        })
        .catch(err => {
            res.status(404).json({msg:'Error Not Found'})
        })
    }

    static updateTodo(req, res) {
        let id = +req.params.id
        let updtTodo = {
            title: req.body.title,
            description: req.body.description,
            status: req.body.status,
            // due_date: req.body.due_date
        }

        todo.update(updtTodo, {
            where: {
                id: id
            }
        })
        .then(newTodo => {
            if(newTodo == 1){
                res.status(200).json({msg: 'Todo has been updated'})
            }else {
                res.status(400).json({msg: 'validation errors'})
            }
        })
        .catch(err => {
            res.status(500).json({msg:'Internal Server Error'})
        })
    }

    static updateTodoStatus(req, res) {
        let id = +req.params.id
        let updtStatus = {
            status: req.body.status        
        }
        // console.log(updtStatus);

        todo.update(updtStatus, {
            where: {
                id: id
            }
        })
        .then(newTodo => {
            if(newTodo == 1){
                res.status(200).json({msg: 'Todo status has been updated'})
            }else {
                res.status(400).json({msg: 'validation errors'})
            }
        })
        .catch(err => {
            res.status(500).json({msg:'Internal Server Error'})
        })
    }
    
    static deleteTodo(req, res) {
        let id = +req.params.id

        todo.destroy({where: {
            id: id
            }
        })
        .then(data => {
            if(data == 1) {
                res.status(200).json({msg: 'Todo Success to Delete'})
            } else {
                res.status(404).json({msg: 'Error Not Found'})
            }
        })
        .catch(err => {
            res.status(500).json({msg:'Internal Server Error'})
        })
    }

}

module.exports = todoController