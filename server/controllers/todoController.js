const { Todo } = require('../models')

class Controller {
    static showAll(req, res) {
        Todo.findAll({
            order: [['createdAt', 'ASC']]
        })
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
            let {id, title, description, status, due_date} = data
            const options = { 
                month: '2-digit', 
                day: '2-digit',
                year: 'numeric', 
            };
            let output = {
                id,
                title,
                description,
                status,
                due_date: due_date.toLocaleString("en-ID", options)
            }
            res.status(201).json(output)
        })
        .catch(err => {
            if (err.errors[0].message === "due date must be greater or equal today") {
                return res.status(400).json({message: "due date must be greater or equal today"})
            }
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
                throw {message: "error not found"}
            }
        })
        .catch(err => {
            res.status(404).json(err)
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
                res.status(404).json({message: `error not found`})                
            } else {
                const options = { 
                    month: '2-digit', 
                    day: '2-digit',
                    year: 'numeric', 
                };
                data[1][0].dataValues.due_date = data[1][0].dataValues.due_date.toLocaleString("en-ID", options)
                console.log(data[1]);
                res.status(200).json(data[1])
            }
        })
        .catch(err => {
            if (err.errors[0].message === "due date must be greater or equal today") {
                return res.status(400).json({message: "due date must be greater or equal today"})
            }
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
                res.status(404).json({message: `error not found`})
            } else{
                const options = { 
                    month: '2-digit', 
                    day: '2-digit',
                    year: 'numeric', 
                };
                data[1][0].dataValues.due_date = data[1][0].dataValues.due_date.toLocaleString("en-ID", options)
                res.status(200).json(data[1][0])
            }
        })
        .catch(err => {
            if (err.errors[0].message === "due date must be greater or equal today") {
                return res.status(400).json({message: "due date must be greater or equal today"})
            }
            res.status(500).json({message: `internal server error`})
        })
    }

    static delete(req, res) {
        let { id } = req.params
        Todo.destroy({where: {id}})
        .then(data => {
            if (data === 0) {
                return res.status(404).json({message: "error not found"})
            }
            res.status(200).json({message: `todo success to delete`})
        })
        .catch(err => {
            res.status(500).json({message: "internal server error"})
        })
    }
}

module.exports = Controller