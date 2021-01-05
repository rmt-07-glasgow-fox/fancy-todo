const {Todo} = require('../models')
class TodosController{
    static showTodos (req, res) {
        Todo.findAll()
        .then(result => {
            return res.status(200).json(result);
        })
        .catch(err => {
            return res.status(500).json({message: 'Your Server Is not Connect'});
        })
    }
    static saveTodos(req, res) {
        let {title, description, status, due_date} = req.body
        Todo.create({title, description, status, due_date})
        .then(data => {
            return res.status(201).json(data);
        })
        .catch(err => {
            if (err.errors){
                err.errors.forEach(e => {
                    if(e.message === 'Date must be more than this day'){
                        return res.status(400).json({message: err.message});
                    }
                });
            }
            res.status(500).json({message: 'Your Server Is not Connect'});
        })
    }
    static showTodosById(req, res) {
        let id = +req.params.id
        Todo.findByPk(id)
        .then(data => {
            if(data === null) {
                return res.status(404).json({message: 'Error Not Found'})
            }
            res.status(200).json(data)
        })
        .catch(err => {
            res.status(500).json({message: 'Your Server Is not Connect'})
        })
    }
    static updateTodos (req, res) {
        let id = +req.params.id
        let {title, description, status, due_date} = req.body
        Todo.update({title, description, status, due_date}, { where : {id} })
        .then(data => {
            if (data === 0){
                return res.status(404).json({message: 'Error Not Found'});
            }
            res.status(200).json({message: 'Succes Update todos'})
        })
        .catch(err => {
            res.status(500).json({message: 'Your Server Is not Connect / Error'});
        })
    }
    static patchTodos (req, res) {
        let id = +req.params.id
        let { status } = req.body
        Todo.update({ status }, { where : {id} })
        .then(data => {
            if(data[0] === 0){
                return res.status(404).json({message: 'Error Not Found'});
            }
            res.status(200).json({message: 'Success Update Status'})
        })
        .catch(err => {
            res.status(500).json({message: 'Your Server Is not Connect / Error'});
        })

    }
    static deleteTodos(req, res) {
        let id = +req.params.id
        Todo.destroy({ where : {id} })
        .then(data => {
            if (data === 0){
                return res.status(404).json({message: 'Error Not Found'});
            }
            res.status(200).json({message: 'Todos Success to Delete'})
        })
        .catch(err => {
            res.status(500).json({message: 'Your Server Is not Connect / Error'});
        })
    }
}

module.exports = TodosController

