const route = require('express').Router()
const Controller = require('../controllers/controller-todo')
const { authentication, authorization } = require('../middlewares/auth') 

// routing dan endpoints
// authentication
route.use(authentication)

route.get('/todos', Controller.showAllTodos)
route.post('/todos', Controller.createTodos)

// authorization
route.get('/todos/:id', authorization, Controller.showById)
route.put('/todos/:id', authorization, Controller.updateTodos)
route.patch('/todos/:id', authorization, Controller.changeStatus)
route.delete('/todos/:id', authorization, Controller.deleteTodos)

module.exports = route