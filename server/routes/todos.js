const route = require('express').Router()
const Controller = require('../controllers/todoController')
const authorization = require('../middlewares/authorization')

route.post('/', Controller.create)
route.get('/', Controller.findAll)
route.get('/:id', authorization, Controller.findByPk)
route.put('/:id', authorization, Controller.update)
route.patch('/:id', authorization, Controller.updateStatus)
route.delete('/:id', authorization, Controller.delete)

module.exports = route