const route = require('express').Router()
const Controller = require('../controllers/todoController')

route.post('/', Controller.create)
route.get('/', Controller.findAll)
route.get('/:id', Controller.findByPk)
route.put('/:id', Controller.update)
route.patch('/:id', Controller.updateStatus)
route.delete('/:id', Controller.delete)

module.exports = route