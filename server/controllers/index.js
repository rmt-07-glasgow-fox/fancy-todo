const { Todo } = require('../models')

class Controller {
    static showAll(req, res) {
        Todo.findAll()
        .then(data => {
            res.status(200).json(data);
        })
        .catch(err => {
            res.status(500).json({message: "internal server error"});
        })
    }

    static add(req, res) {
        let input = {
            title: req.body.title,
            description: req.body.description,
            status: req.body.status,
            due_date: req.body.due_date
        }
        Todo.create(input)
        .then(data => {
            res.status(201).json(data)
        })
        .catch(err => {
            res.status(500).json({message: "internal server error"})
        })
    }

    static showOne(req, res) {
        let id = req.params.id
        Todo.findByPk(id)
        .then(data => {
            if (data) {
                res.status(200).json(data)
            } else {
                res.status(404).json({message: "error not found"})
            }
        })
        .catch(err => {
            res.status(500).json({message: "internal server error"})
        })
    }

    static edit(req, res) {
        let input = {
            title: req.body.title,
            description: req.body.description,
            status: req.body.status,
            due_date: req.body.due_date
        };
        let id = req.params.id;
        Todo.update(input, {
            where: {id},
            returning: true
        })
        .then(data => {
            if (data[0] === 0) {
                res.status(404).json(`error not found`)                
            } else {
                res.status(200).json(data[1])
            }
        })
        .catch(err => {
            res.status(500).json({message: "internal server error"})
        })
    }

    static editStatus(req, res) {
        let { status } = req.body
        let { id }= req.params
        Todo.update({status: Boolean(status)}, {
            where: {id},
            returning: true
        })
        .then(data => {
            if (data[0] === 0) {
                res.status(404).json(`error not found`)
            } else{
                res.status(200).json(data[1])
            }
        })
        .catch(err => {
            res.status(500).json(`internal server error`)
        })
    }
}

module.exports = Controller