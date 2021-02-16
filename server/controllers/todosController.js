const { Todo } = require('../models')
const axios = require("axios")

class todosController {

    static createTodo(req, res, next) {
        const newTodo = {
            title: req.body.title,
            description: req.body.description,
            status: req.body.status ? req.body.status : "belum",
            due_date: req.body.due_date,
            UserId: req.user.id
        }

        Todo.create(newTodo)
            .then(data => {
                res.status(201).json(data)
            })
            .catch(err => {
                // console.log(err.name)
                if (err.name === 'SequelizeValidationError') {
                    let temp = err.errors.map(el => el.message)
                    next({
                        message: temp,
                        code: 400,
                        from: 'create todo'
                    })
                } else {
                    next({
                        message: err.message,
                        code: 500,
                        from: 'create todo'
                    })
                }
            })

    }

    static getTodo(req, res, next) {
        let todo = []
        Todo.findAll()
            .then(data => {
                data.forEach(el => {
                    if(el.UserId == req.user.id) {
                        todo.push(el)
                    }
                });
                let url = process.env.WEATHER_JKT
                return axios.get(url)

            })
            .then(response => {
                res.status(200).json({ data: todo, weather: response.data })
            })
            .catch(err => {
                console.log(err)
                next({
                    message: err.message,
                    code: 500,
                    from: 'get todo'
                })
            })
    }

    static getTodoById(req, res, next) {
        Todo.findOne({
            where: {
                id: req.params.id
            }
        })
            .then(data => {
                if (!data) {
                    next({
                        message: 'data not found',
                        code: 404,
                        from: 'get todo by id'
                    })
                } else {
                    res.status(200).json(data)
                }
            })
            .catch(err => {
                next({
                    message: err.message,
                    code: 500,
                    from: 'get todo by id'
                })
            })
    }

    static editTodo(req, res, next) {
        const dataTodo = {
            title: req.body.title,
            description: req.body.description,
            status: req.body.status,
            due_date: req.body.due_date
        }

        Todo.update(dataTodo, {
            where: {
                id: req.params.id
            }
        })
            .then(data => {
                if (!data) {
                    next({
                        message: "data not found",
                        code: 404,
                        from: 'update todo'
                    })
                } else {
                    res.status(200).json({ message: "data updated!" })
                }
            })
            .catch(err => {
                if (err.name === 'SequelizeValidationError') {
                    let temp = err.errors.map(el => el.message)
                    next({
                        message: temp,
                        code: 400,
                        from: 'update todo'
                    })
                } else {
                    next({
                        message: err.message,
                        code: 500,
                        from: 'update todo'
                    })
                }
            })
    }

    static changeStatus(req, res, next) {
        const status = req.body.status

        Todo.update({ status: status }, {
            where: {
                id: req.params.id
            }
        })
            .then(data => {
                if (!data) {
                    next({
                        message: "data not found",
                        code: 404,
                        from: 'change status todo'
                    })
                } else {
                    res.status(200).json({ message: "status updated!" })
                }
            })
            .catch(err => {
                if (err.name === 'SequelizeValidationError') {
                    let temp = err.errors.map(el => el.message)
                    next({
                        message: temp,
                        code: 400,
                        from: 'update todo'
                    })
                } else {
                    next({
                        message: err.message,
                        code: 500,
                        from: 'update todo'
                    })
                }
            })
    }

    static deleteTodo(req, res, next) {
        Todo.destroy({
            where: {
                id: req.params.id
            }
        })
            .then(data => {
                if (!data) {
                    next({
                        message: "data not found",
                        code: 404,
                        from: 'change status todo'
                    })
                } else {
                    res.status(200).json({ message: "todo success to delete" })
                }
            })
            .catch(err => {
                next({
                    message: err.message,
                    code: 500,
                    from: 'update todo'
                })
            })
    }
}


module.exports = todosController