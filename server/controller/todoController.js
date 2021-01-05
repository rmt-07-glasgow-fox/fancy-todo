const { TodoList } = require('../models')

class Controller {
    static async createTodo(req, res) {
        let create = req.body
        try {
            const data = await TodoList.create(create)
            if(!data) {
                return res.status(400).json({message : 'validation errors'})
            } else {
                return res.status(201).json({
                    id : data.id,
                    title: data.title,
                    description : data.description,
                    status : data.status,
                    due_date : data.due_date
                })
            }
        } catch (err){
            res.status(500).json({
                message : 'Error in internal server'
            })
        }
    }

    static async readList(req, res) {
        try {
            let data = await TodoList.findAll()
            res.status(200).json(data)

        } catch (err){
            res.status(500).json({message : "Error in internal server"})
        }
    }

    static async getTodo(req, res) {
        let todoId = +req.params.id

        try {
            let data = await TodoList.findByPk(todoId)
            if(!data) {
                return res.status(404).json({message : 'Error not found'})
            } else {
                return res.status(200).json({
                    id : data.id,
                    title: data.title,
                    description : data.description,
                    status : data.status,
                    due_date : data.due_date
                })
            }
        } catch (err){
            res.status(500).json({message : 'Error in internal server'})
        }
    }

    static async editTodo(req, res) {

    }

    static async editStatus(req, res) {

    }

    static async deleteTodo(req, res) {

    }
}

module.exports = Controller