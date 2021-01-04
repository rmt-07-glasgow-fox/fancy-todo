
const {Todo} = require('../models/index')

class Controller{
    static home(req, res){
        res.send(`Hello Welcome`)
    }

    static postTodo(req, res){
        let obj = {
            title: req.body.title,
            description: req.body.description,
            status: false,
            due_date: req.body.due_date
        }
        Todo.create(obj)
        .then(data =>{
            return res.status(201).json(data)
        })
        .catch(err =>{
            if(err.name === 'SequelizeValidationError'){
                return res.status(400).json({
                    msg: `should using date from today or after today`
                })
            }
            return res.status(500).json({
                msg: `error from the server`
            })
        })
    }
}

module.exports = Controller