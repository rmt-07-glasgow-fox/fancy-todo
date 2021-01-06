const { todoList } = require('../models')

class todo {
    static async createTodo (req, res) {
        let input = req.body
        try {
            const data = await todoList.create(input)
            if (!data) return res.status(400).json({
                msg: 'validation errors'
            })
            else {
                return res.status(201).json({
                    id: data.id,
                    title: data.title,
                    description: data.description,
                    status: data.status,
                    due_date: data.due_date
                })

            }
        }
        catch (err) {
            res.status(500).json(err)
        }
    }
    static async readTodo (req, res) {
        try {
            const data = await todoList.findAll()
            res.status(200).json(data)
        }
        catch (err) {
            res.status(500).json(err)
        }
    }
    static async getOneTodo (req, res) {
        let id = req.params.id
        try {
            const data = await todoList.findByPk(id)
            if(data) return res.status(200).json({
                id: data.id,
                title: data.title,
                description: data.description,
                status: data.status,
                due_date: data.due_date
            })
            else{ return res.status(404).json({
                msg: 'error not found'
            })
            }
        }
        catch (err) {
            res.status(500).json({
                msg: 'Error in internal server'
            })
        }
    }
    static async editTodo (req, res) {
        let id = req.params.id
        const edit = {
            title: req.body.title,
            description: req.body.description,
            status: req.body.status,
            due_date: req.body.due_date,
        }
        try {
            const data = await todoList.findByPk(id)
            if (!data) return res.status(404).json({
                msg: 'error not found'
            })
            else {
                const updateData = await todoList.update(edit, {
                    where: { id }
                })
                return res.status(200).json(updateData)
            }
        }
        catch (err) {
            res.status(500).json(err)
        }
    }
    static async editStatus (req, res) {
        let id = req.params.id
        let editStatus = {
            status: req.body.status
        }
        try {
            const data = await todoList.findByPk(id)
            if (!data) return res.status(404).json({
                msg: 'error not found'
            })
            else {
                const updateData = await todoList.update(editStatus, {
                    where: { id }
                }, 
                )
                return res.status(200).json(updateData)
            }
        }
        catch (err) {
            res.status(500).json({
                msg: 'Error in internal server'
            })
        }
    }
    static async deleteTodo (req, res) {
        let id = req.params.id
        try {
            const data = await todoList.findByPk(id)
            if (!data) return res.status(404).json({
                msg: 'error not found'
            })
            else {
                const deleted = await todoList.destroy({
                    where: { id }
                })
                return res.status(200).json({
                    msg: 'todo success deleted'
                })
            }
        }
        catch (err) {
            res.status(500).json({
                msg: 'Error in internal server'
            })
        }
    }
}

module.exports = todo