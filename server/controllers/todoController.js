
const { Todo } = require ("../models")

class TodoController {

    static list (req, res, next) {

        const idLoggedIn = req.user.id
        Todo.findAll ({ where: {
                UserId : idLoggedIn
            }, order: [["due_date", "ASC"]]
        })
        .then(result => {
            const newResult = result.map (el => {
                const newDate = el.due_date.toUTCString()
                return {
                    id: el.id,
                    title: el.title,
                    description: el.description,
                    status: el.status,
                    due_date: newDate,
                    UserId: el.UserId
                }
            })
            
            return res.status (200).json (newResult)
        })
        .catch (err => {
            next ({ name: "InternalError" })
        })
        
    }

    static linkAddTodo (req, res, next) {

        const { title, description, status, due_date } = req.body
        const UserId = req.user.id

        Todo.create ({
            title, description, status, due_date, UserId
        })
        .then (result => {
            return res.status (201).json(result)
        })
        .catch (err => {
            if (err.name) {
                next (err)
            } else {
                next ({ name: "InternalError" })
            }
        })
        
    }

    static showDataTodo (req, res, next) {
        
        const id = +req.params.id

        Todo.findByPk(id)
        .then (result => {
            return res.status (200).json (result)
        })
        .catch (err => {
            next ({ name: "ResourceNotFound" })
        })
    }

    static replaceTodo (req, res, next) {

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
               next ({ name: "ResourceNotFound" })
            }
        })
        .then (result => {
            return res.status (200).json (result)
        })
        .catch (err => {
            if (err.name) {
                next (err)
            } else {
                next ({ name: "InternalError" })
            }
        })
        
    }

    static modifyTodo (req, res, next) {
        const id = +req.params.id
        const status = req.body.status

        Todo.update ({ status }, { 
            where : {
                id 
            }, fields: [ "status" ],
            returning: true
        })
        .then (result => {
            if (result[0] === 1) {
                return Todo.findByPk (id)
            } else {
               next ({ name: "ResourceNotFound" })
            }
        })
        .then (result => {
            return res.status (200).json (result)
        })
        .catch (err => {
            if (err.name) {
                next (err)
            } else {
                next ({ name: "InternalError" })
            }
        })


    }

    static removeTodo (req, res, next) {
        
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
               next ({ name: "ResourceNotFound" })
            }
        })
        .catch (err => {
            next ({ name: "InternalError" })
        })

    }



}

module.exports = TodoController