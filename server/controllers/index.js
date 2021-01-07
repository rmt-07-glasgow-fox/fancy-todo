const {Todo} = require('../models')


class TodoController {

    static async createTodo (req, res, next) {
        try {
            let body = {
                title: req.body.title,
                description: req.body.description,
                status: 'Undone',
                due_date: req.body.due_date,
                userId: req.user.id
            }
            const created = await Todo.create(body)
            res.status(201).json(created)
        } catch (err) {
            next(err)
        }
    }

    static async getList (req, res, next) {
        try {
            const list = await Todo.findAll()
            res.status(200).json(list)
        } catch (err) {
            next(err)
        }
    }
    
    static async getTodoById (req, res, next) {
        try {
            const id = req.params.id
            const list = await Todo.findByPk(id)
            res.status(200).json(list)
        } catch (err) {
            next(err)
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
            next(err)
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
            next(err)
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
            next(err)
        }
    }

    

}

module.exports = TodoController