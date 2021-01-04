const { Todo } = require('../models/index')

class TodoController{
    static async getTodo(req, res){
        try{
            const result = await Todo.findAll()
            return res.status(200).json(result)
        }
        catch(err){
            return res.status(500).json(err)
        }
    }

    static async addTodo(req, res){
        try {
            const opt = {
                title: req.body.title,
                description: req.body.description,
                status: req.body.status,
                dueDate: req.body.dueDate
            }
            
            const result = await Todo.create(opt)

            return res.status(201).json(result)
        }
        catch(err){
            return res.status(400).json(err)
        }    
    }

    static async showTodoByid(req, res){
        try{
            const id = +req.params.id

            const result = await Todo.findAll({
                where: { id }
            })

            res.status(200).json(result)
        }
        catch{
            res.status(404).json({message: 'server error'})
        }
    }

    static async updateTodo(req, res){
        try{
            const id = +req.params.id
            const opt = {
                title: req.body.title,
                description: req.body.description,
                status: req.body.status,
                dueDate: req.body.dueDate
            }

            const result = await Todo.update(opt, {
                where: {
                    id
                },
                returning: true
            })

            res.status(200).json(result)
        }
        catch(err){
            res.status(500).json(err)
        }
    }

    static async updateTodoPatch(req, res){
        try{
            const id = +req.params.id
            const status = {
                status: req.body.status
            }

            const result = await Todo.update(status, {
                where: {
                    id
                },
                returning: true
            })

            res.status(200).json(result)
        }
        catch(err){
            res.status(500).json(err)
        }
    }

    static async deleteTodo(req, res){
        try{
            const id = +req.params.id

            await Todo.destroy({
                where: {
                    id
                }
            })

            res.status(200).json({message: 'todo success to delete'})
        }
        catch(err){
            res.status(500).json(err)
        }
        
    }
    
}

module.exports = TodoController