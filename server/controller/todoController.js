const { todo } = require('../models/index')

class todoController {
    static getAllTodo (req, res, next) {
        // console.log(req.user.id);
        todo.findAll()
        .then(todo => {
            res.status(200).json(todo)
        })
        .catch(err => {
            next(err)
        })
    }

    static createTodo(req, res, next) {
        let newTodo = {
            title: req.body.title,
            description: req.body.description,
            status: req.body.status,
            due_date: req.body.due_date,
            UserId: req.user.id
        }

        todo.create(newTodo) 
        .then(todo => {
            res.status(201).json(todo)
        })
        .catch(err => {    
            next(err)
        })
    }

    static findOne(req, res, next) {
        let id = +req.params.id

        todo.findByPk(id)
        .then(todo => {
            res.status(200).json(todo)
        })
        .catch(err => {
            next(err)
        })
    }

    static updateTodo(req, res, next) {
        console.log(req.params);
        let id = +req.params.id
        let updtTodo = {
            title: req.body.title,
            description: req.body.description,
            status: req.body.status,
            due_date: req.body.due_date
        }

        todo.update(updtTodo, {
            where: {
                id: id
            }
        })
        .then(data => {
            if(data){
                res.status(200).json({msg: 'Todo has been updated'})
                
            }else {
                next({name: 'DataNotFound', msg: 'Data Not Found'})
            }
        })
        .catch(err => {
            next(err)
        })
    }

    static updateTodoStatus(req, res, next) {
        let id = +req.params.id
        let updtStatus = {
            status: req.body.status        
        }

        todo.update(updtStatus, {
            where: {
                id: id
            }
        })
        .then(newTodo => {
            if(!newTodo){
                res.status(200).json({msg: 'Todo status has been updated'})
            }else {
                next({name: DataNotFound, msg: 'Data Todo Not Found'})
            }
        })
        .catch(err => {            
            next(err)
        })
    }
    
    static deleteTodo(req, res, next) {
        let id = +req.params.id

        todo.destroy({where: {
            id: id
            }
        })
        .then(data => {
            console.log(data);
            if(data == 1) {
                res.status(200).json({msg: 'Todo Success to Deleted'})
            } else {               
                next({name: DataNotFound, msg: 'Data Todo Not Found'})
            }
        })
        .catch(err => {
            next(err)
        })
    }

}

module.exports = todoController