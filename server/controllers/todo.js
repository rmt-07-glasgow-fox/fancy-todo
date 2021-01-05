const { noExtendLeft } = require('sequelize/types/lib/operators')
const Todo = require('../models')

class ToDoController{
    static async todoList(req, res, next){
        try{
            let data = await Todo.findAll({
                where: {
                    UserId: req.user
                }
            })
            res.status(200).json(data)
        } catch(err){
            next(err)
        }
    }

    static async pickTodo(req, res, next){
        try{
            let data = await Todo.findOne({
                where: {
                    id: +req.params.id
                }
            })
            if(data !== null){
                res.status(200).json(data)
            } else {
                throw new Error('error not found')
            }
        } catch(err){
            next()
        }
    }

    static async addTodo(req, res, next){
        try{
            let obj = {
                title: req.body.title,
                description: req.body.description,
                status: req.body.status,
                due_date: req.body.due_date,
                UserId: req.user
            }
            let data = await Todo.create(obj)
            res.status(201).json(data)
        } catch(err){
            if(err.errors){
                let errors = err.errors.map (el =>{
                    return el.message
                })
                next({name: 'Error Input', message: errors})
            } else{
                next(err)
            }
        }
    }

    static async editTodo(req, res, next){
        try {
            let obj = {
                title: req.body.title,
                description: req.body.description,
                status: req.body.status,
                due_date: req.body.due_date
            }

            let data = await Todo.update(obj, {
                where: {
                    id: +req.params.id
                },
                returning: true
            })

            let isSuccess = data[0]
            let dataObj = data[1]
            if(isSuccess === 1){
                res.status(200).json(dataObj)
            }else{
                res.status(404).json({ message: 'error not found' })
            }
        } catch(err){
            if(err.errors){
                let errors = err.errors.map (el => {
                    return el.message
                })
                next({name: 'Error Input', message: errors})
            }else{
                next(err)
            }
        }
    }

    static async patchTodo(req, res, next){
        try {
            let obj = {
                status: req.body.status
            }
            let data = await Todo.update (obj, {
                where: {
                    id: +req.params.id
                },
                returning: true
            })
   
            let isSuccess = data[0]
            let dataObj = data[1]
            if (isSuccess === 1) {
                res.status(200).json(dataObj)
            } else {
                res.status(404).json({message: 'error not found'})
            }
        } catch (err) {
            if (err.errors) {
              let errors = err.errors.map (e => {
                return e.message
            })
            next ({name: 'Error Input', message: errors})
            } else {
                next (err)
            }
        }
    }

    static async deleteTodo(req, res, next){
        try {
            let data = await Todo.destroy ({
                where: {
                    id: +req.params.id,
                }
            })
            if (data === 1) {
                res.status(200).json({message: 'todo success to delete'})
            } else {
                res.status(404).json({message: 'error not found'})
            }
        } catch (err) {
            next (err)
        }
    }
}

module.exports = ToDoController