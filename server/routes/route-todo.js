const route = require('express').Router()
const Controller = require('../controllers/controller-todo')

// routing dan endpoints
route.get('/todos', Controller.showAllTodos)
route.post('/todos', Controller.createTodos)
route.get('/todos/:id', Controller.showById)
route.put('/todos/:id', Controller.updateTodos)
route.patch('/todos/:id', Controller.changeStatus)
route.delete('/todos/:id', Controller.deleteTodos)

module.exports = route