const { Todo } = require('../models/index')

class TodoController{
    static async getTodo(req, res){
        try{
            const result = await Todo.findAll()

            return res.status(201).json(result)
        }
        catch(err){
            return res.status(500).json(err)
            // return next(err)
        }
    }

    static async addTodo(req, res){
        try {
            const opt = {
                title: req.body.title,
                description: req.body.description,
                status: req.body.status,
                dueDate: req.body.dueDate,
                userId: req.user.id
            }
            
            const result = await Todo.create(opt)
            
            return res.status(201).json(result)
        }
        catch(err){
            return res.status(500).json(err)
            // return next(err)
        }    
    }

    static async showTodoByid(req, res){
        try{
            const id = +req.params.id

            const result = await Todo.findOne({
                where: { id }
            })

            if(result){
                return res.status(200).json(result)
            }else{
                return res.status(404).json({name: 'error not found'})
                // return next({
                //     name: "resourceNotFound"
                // })
                // throw new Error('resourceNotFound')
            }
        }
        catch(err){
            // next(err)
            return res.status(500).json({message: 'server error'})
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

            return res.status(200).json(result)
        }
        catch(err){
            return res.status(500).json(err)
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

            return res.status(200).json(result)
        }
        catch(err){
            return res.status(500).json(err)
        }
    }

    static async deleteTodo(req, res){
        try{
            const id = +req.params.id

            const result = await Todo.destroy({
                where: {
                    id
                }
            })

            if(!result){
                return res.status(404).json({message: 'error not found'})
                // next({
                //     name: "resourceNotFound"
                // })
            }

            return res.status(200).json({message: 'todo success to delete'})
        }
        catch(err){
            return res.status(500).json(err)
        }
        
    }
    
}

module.exports = TodoController