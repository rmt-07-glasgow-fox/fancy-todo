const {Todo} = require('../models')

class TodoController {
    static findTodos(req, res, next) {
        Todo.findAll({
            where: {
                user_id: +req.user.id
            },
            attributes: {
                exclude: [ 'createdAt', 'updatedAt']
            },
            order: [['status', 'DESC']]
        })
        .then(data => {
            res.status(200).json(data)
        })
        .catch(err => {
            next({ message: "Internal Server Error"})
        })
    }

    static addTodos(req, res, next) {
        const { title, description, status, due_date} = req.body
        console.log(req.user.id, 'ini disini')
        const user_id = req.user.id
        let obj = {
            title,
            description,
            status,
            due_date,
            user_id
        }
        console.log(obj)
        Todo.create(obj)
        .then(data => {
            res.status(201).json(data)
        })
        .catch(err => {
            console.log(err)
            next(err)
        })
    }
    
    static findTodoById(req, res, next) {
        let id = req.params.id
        Todo.findByPk(id, {
            attributes: {
                exclude: ['createdAt', 'updatedAt']
            }
        })
        .then(data => {
            if (!data) {
                next({message: 'Data Not Found'})
            } else {
                res.status(200).json(data)
            }
        })
        .catch(err => {
            next({message: 'Internal Server Error'})
        })
    }

    static update(req, res, next) {
        let id = req.params.id
        const { title, description, status, due_date} = req.body
        let obj = {
            title,
            description,
            status,
            due_date
        }
        Todo.update(obj, {
            where: {
                id
            }
        })
        .then(data => {
            res.status(200).json(data)
        })
        .catch(err => {
            next({message: 'Internal Server Error'})
        })
    }

    static editStatus(req, res, next) {
        let id = req.params.id
        const { status } = req.body
        let obj = { status }
        Todo.update(obj, {
            where: {
                id
            }
        })
        .then(data => {
            res.status(200).json(data)
        })
        .catch(err => {
            next({message: 'Internal Server Error'})
        })
    }
    
    static delete(req, res, next) {
        let id = req.params.id
        Todo.destroy({
            where: {
                id
            }
        })
        .then(data => {
            if (!data) {
                next({ message: 'Data Not Found'})
            } else {
                res.status(200).json({message: 'Todo Has Been Succesfully Deleted'})
            }
        })
        .catch(err => {
            next({message: 'Internal Server Error'})
        })
    }

}

module.exports = {TodoController}