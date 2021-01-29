const { Todo } = require('../models');

class Controller {
    static showAll(req, res, next) {
        const options = { 
            month: '2-digit', 
            day: '2-digit',
            year: 'numeric', 
        };
        Todo.findAll({
            where: {UserId: req.user.id},
            order: [['due_date', 'ASC']]
        })
        .then(data => {
            data.forEach(el => {
                let { due_date } = el
                el.dataValues.due_date = due_date.toLocaleString("en-ID", options)
            });
            res.status(200).json(data);
        })
        .catch(err => {
            next(err)
        })
    }

    static add(req, res, next) {
        let input = {
            title: req.body.title,
            description: req.body.description,
            status: req.body.status,
            due_date: req.body.due_date,
            UserId: req.user.id
        }
        Todo.create(input)
        .then(data => {
            let {id, title, description, status, due_date, UserId} = data
            let output = {
                id,
                title,
                description,
                status,
                due_date,
                UserId
            }
            res.status(201).json(output)
        })
        .catch(err => {
            next(err)
        })
    }

    static showOne(req, res, next) {
        let id = req.params.id
        Todo.findOne({
            where: {
                id,
            }})
        .then(data => {
            if (data) {
                res.status(200).json(data)
            } else {
                throw ({ name : "resourceNotFound"})
            }
        })
        .catch(err => {
            next(err)
        })
    }

    static edit(req, res, next) {
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
                throw ({ name: "resourceNotFound"})
            } else {
                res.status(200).json(data[1])
            }
        })
        .catch(err => {
            next(err)
        })
    }

    static editStatus(req, res, next) {
        let { status } = req.body
        let { id }= req.params
        Todo.update({status: status}, {
            where: {id},
            returning: true
        })
        .then(data => {
            if (data[0] === 0) {
                throw ({ name: "resourceNotFound"})
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
            next(err)
        })
    }

    static delete(req, res, next) {
        let { id } = req.params
        Todo.destroy({where: {id}})
        .then(data => {
            if (data === 0) {
                throw ({ name: "resourceNotFound"})
            }
            res.status(200).json({message: `todo success to delete`})
        })
        .catch(err => {
            next(err)
        })
    }
}

module.exports = Controller