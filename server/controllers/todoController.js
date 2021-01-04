const { Todo } = require ("../models")

class TodoController {

    static list (req, res) {

        Todo.findAll ()
        .then(result => {
            return res.status (200).json (result)
        })
        .catch (err => {
            return res.status (500).json (err.errors[0].message)
        })
        
    }

    static linkAddTodo (req, res) {

        const { title, description, status, due_date } = req.body

        Todo.create ({
            title, description, status, due_date
        })
        .then (result => {
            return res.status (201).json(result)
        })
        .catch (err => {
            if (err.name === "SequelizeValidationError") {
                return res.status (400).json (err.errors[0].message)
            } else {
                return res.status (500).json (err.errors[0].message)
            }
        })
        
    }

    static showDataTodo (req, res) {
        
        const id = +req.params.id

        Todo.findByPk(id)
        .then (result => {
            return res.status (200).json (result)
        })
        .catch (err => {
            return res.status (500).json (err.errors[0].message)
        })
    }

    static replaceTodo (req, res) {

        const id = req.params.id
        const { title, description, status, due_date } = req.body

        Todo.update ({ title, description, status, due_date }, {
            where: {
                id
            }, fields: [ "title", "description", "status", "due_date" ]
        })
        .then (result => {
            if (result[0] === 1) {
                return Todo.findByPk (id)
            } else {
                return res.status (404).json ({
                    message: "Error Not Found"
                })
            }
        })
        .then (result => {
            return res.status (200).json (result)
        })
        .catch (err => {
            if (err.name === "SequelizeValidationError") {
                res.status (400).json (err.errors[0].message)
            } else {
                res.status (500).json (err.errors[0].message)
            }
        })
        
    }

    static modifyTodo (req, res) {
        const id = +req.params.id
        const status = req.body.status

        Todo.update ({ status }, { 
            where : {
                id 
            }, fields: [ "status" ]
        })
        .then (result => {
            if (result[0] === 1) {
                return Todo.findByPk (id)
            } else {
                return res.status (404).json ({
                    message: "Error Not Found"
                })
            }
        })
        .then (result => {
            return res.status (200).json (result)
        })
        .catch (err => {
            if (err.name === "SequelizeValidationError") {
                res.status (400).json (err.errors[0].message)
            } else {
                res.status (500).json (err.errors[0].message)
            }
        })


    }

    static removeTodo (req, res) {
        
        const id = +req.params.id

        Todo.destroy ({
            where: {
                id
            }
        })
        .then (result => {
            if (result === 1) {
                res.status (200).json ({
                    message: "Todo Success to delete"
                })
            } else {
                res.status (404).json ({
                    message: "Error Not Found"
                })
            }
        })
        .catch (err => {
            return res.status (500).json (err.errors[0].message)
        })

    }



}

module.exports = TodoController