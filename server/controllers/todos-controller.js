const { Todo, User } = require('../models');

class TodoController {

    static todosGet = (req, res, next) => {
        Todo.findAll({attributes:  {exclude: ['createdAt', 'updatedAt']}, include: {model: User, attributes: ['name']} ,order: [['id', 'ASC']]})
        .then(output => res.status(200).json(output))
        .catch(err => err ? next(err) : next({name: 'InternalServerError'}));
    }

    static todosPost = (req, res, next) => {
        const UserId = req.user.id;
        const {title, description, due_date} = req.body;
        Todo.create({title, description, due_date, UserId})
        .then(output => res.status(200).json(output))
        .catch(err => err ? next(err) : next({name: 'InternalServerError'}));
    
    }
    static todoGet = (req, res, next) => {
        Todo.findByPk(req.params.id, {attributes: {exclude: ['createdAt', 'updatedAt']}})
        .then(output => {
            if (output) {
                res.status(200).json(output);
            } else {
                throw({name: 'NotFound'})
            }
        })
        .catch(err => err ? next(err) : next({name: 'InternalServerError'}));
    }

    static todoPut = (req, res, next) => {
        const { title, description, due_date} = req.body;
        Todo.update({title, description, due_date}, {where: {id: req.params.id}, returning: true})
        .then(output => {
            if (output[0] === 1) {
                res.status(200).json(output[1][0]);
            } else {
                throw({name: 'NotFound'})
            }
        })
        .catch(err => err ? next(err) : next({name: 'InternalServerError'}));
    }

    static todoPatch = (req, res, next) => {
        Todo.update({status: req.body.status}, {where: {id: req.params.id}, returning: true})
        .then(output => {
            if (output[0] === 1) {
                res.status(200).json(output[1][0]);
            } else {
                throw({name: 'NotFound'})
            }
        })
        .catch(err => err ? next(err) : next({name: 'InternalServerError'}));
    }
    
    static todoDelete = (req, res, next) => {
        Todo.destroy({where: {id: req.params.id}})
        .then(output => {
            if (output === 1) {
                res.status(200).json({message: 'todo success to delete'});
            } else {
                throw({name: 'NotFound'})
            }
        })
        .catch(err => err ? next(err) : next({name: 'InternalServerError'}));
    }
}

module.exports = TodoController;
// asdasdasdasdasdasdasdas      