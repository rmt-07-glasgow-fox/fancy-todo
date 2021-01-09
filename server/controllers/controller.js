const { Todo } = require('../models')

class Controller {

    static create(req,res,next){
        const input = {
            title: req.body.title || '',
            description: req.body.description || '',
            status: req.body.status || '',
            due_date: req.body.due_date || '',
            UserId: req.user.id
        }
        Todo.create(input)
        .then(data => {
            res.status(200).json(data)
        })
        .catch(err => {
            next(err)
        })
    }

    static showList(req,res,next){
        const { id } = req.user
        Todo.findAll({
            where : {UserId: id}
        })
        .then(data => {
            res.status(200).json(data)
        })
        .catch(err => {
            next(err)
        })
    }

    static showOne(req,res,next){
        console.log(req.params.id);
        Todo.findByPk(req.params.id)
        .then(data => {
            if(data) res.status(200).json(data)
            else next({ name: 'errorNotFound' })
        })
        .catch(err => {
            next(err)
        })
    }

    static edit(req,res,next){
        const input = {
            title: req.body.title || '',
            description: req.body.description || '',
            status: req.body.status || '',
            due_date: req.body.due_date || '',
            UserId: req.user.id
        }
        Todo.update(input,{
            where:{id:req.params.id},
            returning: true
        })
        .then(data => {
            if(data[0] != 0) res.status(200).json(data[1][0])
            else next({ name: 'errorNotFound' })
        })
        .catch(err => {
            next(err)
        })
    }

    static updateStatus(req,res,next){
        const { status } = req.body
        Todo.update({status},{
            where:{id:req.params.id},
            returning: true
        })
        .then(todo => {
            if(todo[0] != 0) res.status(200).json(todo[1][0])
            else next({ name: 'errorNotFound' })
        })
        .catch(err => {
            next(err)
        })
    }

    static delete(req,res,next){
        Todo.destroy({
            where:{id:req.params.id}
        })
        .then(todo => {
            if(todo) res.status(200).json({message:'todo success to delete'})
            else next({ name: 'errorNotFound' })
        })
        .catch(err => {
            next(err)
        })
    }

}

module.exports = Controller