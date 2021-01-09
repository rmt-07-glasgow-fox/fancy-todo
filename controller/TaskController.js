
const { Todo } = require('../models')


class TaskController {


    static home(req,res){
        
    }

    static getTodo(req,res){

        Todo.findAll()
        .then(data =>{
            res.send({data})
        })
        .catch(error =>{
            res.send(err)
        })
        
    }

    static postTodo(req,res){
        
        Todo.create({
            title: req.body.title,
            description: req.body.description,
            status: req.body.status,
            due_date: req.body.due_date
        })
        .then(() => {
            res.redirect('/')
        })
        .catch(err => {
            res.send(err)
        })

    }

    static editTodo(req,res){

        const id = req.params.id

        Todo.findAll({
            where: {id:id}
        })
        .then(data =>{
            res.send({data})
        })
        .catch(err =>{
            res.send(err)
        })

        
    }

    static editTodoPost(req,res){

        const id = +req.body.id
        const todo = {
            title: req.body.title,
            description: req.body.description,
            status: req.body.status,
            due_date: req.body.due_date,
            updateAt: new Date()
        }

        Todo.update(todo, {where: {id: id}})
        .then(res.redirect('/'))
        .catch(err => res.send(err))

    }

    static deleteTodo(req,res){
        const id = req.params.id
        console.log(req.params)
        Todo.destroy({where: {id: id}})
        .then(res.redirect('/'))
        .catch(err => res.send(err))

    }

}

module.exports = TaskController