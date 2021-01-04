const { todoList } = require('../models')

class todo {
    static async readTodo (req, res) {
        try {
            const data = await todoList.findAll()
            res.status(200).json(data)
        }
        catch (err) {
            res.status(500).json({
                msg: 'Error in internal server'
            })
        }
    }
    static async createTodo (req, res) {
        let input = req.body
        try {
            const data = await todoList.create(input)
            res.status(201).json({
                id: data.id,
                tittle: data.tittle,
                description: data.description,
                status: data.status,
                due_date: data.due_date
            })
        }
        catch (err) {
            res.status(500).send({
                msg: 'Error in internal server'
            })
        }
    }
    static async getOneTodo (req, res) {
        let id = req.params.id
        try {
            const data = await todoList.findByPk(id)
            if(data) return res.status(200).json({
                id: data.id,
                tittle: data.tittle,
                description: data.description,
                status: data.status,
                due_date: data.due_date
            })
            if(!data) return res.status(404).json({
                msg: 'error not found'
            })
        }
        catch (err) {
            res.status(404).json(err)
        }
    }
    static async editTodo (req, res) {
        let id = req.params.id
        const edit = {
            tittle: req.body.tittle,
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
                return res.status(200).json(data)
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
                return res.status(200).json(data)
            }
        }
        catch (err) {
            res.status(500).json(err)
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
                    msg: 'todo success to delete'
                })
            }
        }
        catch (err) {
            res.status(500).json(err)
        }
    }
}

module.exports = todo