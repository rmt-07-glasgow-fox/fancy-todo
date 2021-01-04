const {Todo, User} = require('../models')

class Controller {

    static async createTodo (req, res, next) {
        try {
            let body = {
                title: req.body.title,
                description: req.body.description,
                status: 'Undone',
                due_date: req.body.due_date,
                // userId: req.body.userId
            }
            console.log(body)
            const created = await Todo.create(body)
            res.status(201).json(created)
        } catch (err) {
            let message
            if(err.name === 'SequelizeValidationError'){
                message = err.errors[0].message
                res.status(400).json({message})
            } else {
                message = err.message
                res.status(500).json({message})
            }
        }
    }

    static async getList (req, res, next) {
        try {
            const list = await Todo.findAll()
            res.status(200).json(list)
        } catch (err) {
            res.status(500).json({message: err.message})
        }
    }
    
    static async getTodoById (req, res, next) {
        try {
            const id = req.params.id
            const list = await Todo.findByPk(id)
            res.status(200).json(list)
        } catch (err) {
            res.status(500).json({message: err.message})
        }
    }

    static async editTodo (req, res, next) {
        try {
            const id = req.params.id
            const list = await Todo.findByPk(id)
            const data = {
                title: req.body.title,
                description: req.body.description,
                due_date: req.body.due_date
            }
            if (!list) {
                throw {
                    status: 404,
                    message: "Todo not found"
                }
            } else {
                const edited = await Todo.update(data, {where: {id}})
                res.status(200).json('Data edited')
            }
        } catch (err) {
            if(err.status){
                res.status(err.status).json(err.message)
            } else {
                res.status(500).json({message: err.message})
            }
        }
    }

    static async changeStatus(req, res, next){
        try {
            const id = req.params.id
            const list = await Todo.findByPk(id)
            const data = {
                status: 'Done'
            }
            if (!list) {
                throw {
                    status: 404,
                    message: "Todo not found"
                }
            } else {
                const edited = await Todo.update(data, {where: {id}})
                res.status(200).json('Data edited')
            }
        } catch (err) {
            if(err.status){
                res.status(err.status).json(err.message)
            } else {
                res.status(500).json({message: err.message})
            }
        }
    }

    static async deletedTodo(req, res, next){
        try {
            const id = req.params.id
            const list = await Todo.findByPk(id)
            if (!list) {
                throw {
                    status: 404,
                    message: "Todo not found"
                }
            } else {
                const deleted = await Todo.destroy({where: {id}})
                res.status(200).json({message: 'Data deleted'})
            }
        } catch (err) {
            if(err.status){
                res.status(err.status).json({message: err.message})
            } else {
                res.status(500).json({message: err.message})
            }
        }
    }

}

module.exports = Controller