const { Todo } = require('../models')

class TodoController {
    static postTodoHandler(req, res) {
        let { title, description, status, due_date } = req.body

        Todo.create(req.body)
            .then(data => {
                res.status(201).json(data)
            })
            .catch(err => {
                if(err.errors) {
                    err.errors.forEach(data => {                        
                        return res.status(400).json({message: data.message})    
                    })
                }
                res.status(500).json({message: "Internal server error"})
            })
    }

    static getTodoHandler(req, res) {
        
        Todo.findAll()
            .then(data => {
                res.status(200).json(data)
            })
            .catch(err => {
                res.status(500).json({message: 'internal server error'})
            })
    }   

    static getTodoIdHandler(req, res) {
        let id = req.params.id

        Todo.findByPk(id)
            .then(data => {
                if(data === null) {
                    return res.status(404).json({message: 'error not found'})
                }
                res.status(200).json(data)
            })
            .catch(err => {
                res.status(500).json({message: 'internal server error'})
            })
    }

    static putTodoIdHandler(req, res) {
        let id = req.params.id
        let { title, description, status, due_date } = req.body

        Todo.update(req.body, {
            where: {
                id
            }, returning: true
        })
            .then(data => {
                if(data[0] === 0) {
                    return res.status(404).json({message: 'error not found'})
                }
                res.status(200).json(data)
            })
            .catch(err => {
                console.log(err.errors)
                if(err.errors) {
                    err.errors.forEach(data => {                        
                        return res.status(400).json({message: data.message})    
                    })
                }
                res.status(500).json({message: 'internal server error'})
            })
    }

    static patchTodoIdHandler(req, res) {
        let id = req.params.id
        let { status } = req.body

        Todo.update(req.body, {
            where: {
                id
            }, returning: true
        })
            .then(data => {
                if(data[0] === 0) {
                    return res.status(404).json({message: 'error not found'})
                }
                res.status(200).json(data)
            })
            .catch(err => {
                if(err.errors) {
                    err.errors.forEach(data => {                        
                        return res.status(400).json({message: data.message})    
                    })
                }
                res.status(500).json({message: 'internal server error'})
            })
    }

    static deleteTodoHandler(req, res) {
        let id = req.params.id

        Todo.destroy({where: {
            id
        }})
            .then(data => {
                if(data === 0) {
                    return res.status(404).json({message: 'error not found'})
                }
                
                res.status(200).json({message: 'todo success to delete'})
            })
            .catch(err =>{
                res.statu(500).json({message: 'internal server error'})
            })
    }
}

module.exports = TodoController