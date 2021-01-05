const { response } = require('express');
const { verifyToken } = require('../helpers/jwt');
const { User, Todo } = require('../models')

module.exports = {
    authenticate: (req, res, next) => {
        try {
            let decodedUser = verifyToken(req.headers.access_token);

            User.findOne({where: {email: decodedUser.email}})
                .then(user => {
                    if (!user) {
                        res.status(401).json({message: "Please login first"})
                    } else {
                        req.user = {
                            id: user.id,
                            email: user.email
                        }

                        next()
                    }
                })
                .catch(err => {
                    res.status(500).json({message: 'Internal server error'})
                })

        } catch (error) {
            res.status(400).json({ message: error.message })
        }

    },
    authorize: (req, res, next) => {
        let todo_id = +req.params.id;
        let user_id = +req.user.id;

        try {
            Todo.findOne({where: {id: todo_id}})
                .then(todo => {
                    if (!todo) {
                        throw new Error ('Id not found')
                    }

                    if (todo.user_id === user_id) {
                        next()
                    } else {
                        res.status(401).json({message: 'This todo not belong to you'})
                    }
                })
                .catch(err => res.status(500).json({message: err.message}))
        } catch (error) {
            res.status(400).json({message: error.message})
        }
    }
}   