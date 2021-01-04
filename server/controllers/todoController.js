const { Todo } = require('../models')

class Controller {
    static create(req, res) {
        const { title, description, status, due_date } = req.body
        Todo
            .create({ title, description, status, due_date })
            .then(newTodo => {
                res.status(201).json(newTodo)
            })
            .catch(err => {
                let errors = (err.errors) && err.errors.map((error) => error.message);
                let errMsg = {}
                errors.forEach((el, i) => {
                    !errMsg[`message${i}`] && (errMsg[`message${i}`] = '')
                    errMsg[`message${i}`] = el
                });
                err.errors && err.name.includes('Validation') ?
                res.status(400).json(errMsg) :
                res.status(500).json(err.parent.routine)
            })
    }
}

module.exports = Controller