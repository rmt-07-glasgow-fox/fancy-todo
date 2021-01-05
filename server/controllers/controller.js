const { Todo } = require('../models')

class Controller {

    static create(req,res){
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
            if(err.errors) {
                err.errors = err.errors.map(e=>e.message)
                res.status(400).json(err)
            }
            else res.status(500).json({message:'Internal server error'})
        })
    }

    static showList(req,res){
        const { id } = req.user
        Todo.findAll({
            where : {UserId: id}
        })
        .then(data => {
            res.status(200).json(data)
        })
        .catch(err => {
            res.status(500).json({message:'Internal server error'})
        })
    }

    static showOne(req,res){
        Todo.findByPk(req.params.id)
        .then(data => {
            if(data) res.status(200).json(data)
            else res.status(404).json({message:'error not found'})
        })
        .catch(err => {
            res.status(500).json({message:'Internal server error'})
        })
    }

    static edit(req,res){
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
            else res.status(404).json({message:'error not found'})
        })
        .catch(err => {
            if(err.errors) {
                err.errors = err.errors.map(e=>e.message)
                res.status(400).json(err)
            }
            else res.status(500).json({message:'Internal server error'})
        })
    }

    static updateStatus(req,res){
        const { status } = req.body
        Todo.update({status},{
            where:{id:req.params.id},
            returning: true
        })
        .then(todo => {
            if(todo[0] != 0) res.status(200).json(todo[1][0])
            else res.status(404).json({message:'error not found'})
        })
        .catch(err => {
            if(err.errors) {
                err.errors = err.errors.map(e=>e.message)
                res.status(400).json(err)
            }
            else res.status(500).json({message:'Internal server error'})
        })
    }

    static delete(req,res){
        Todo.destroy({
            where:{id:req.params.id}
        })
        .then(todo => {
            if(todo) res.status(200).json({message:'todo success to delete'})
            else res.status(404).json({message:'error not found'})
        })
        .catch(err => {
            res.status(500).json({message:'Internal server error'})
        })
    }

}

module.exports = Controller