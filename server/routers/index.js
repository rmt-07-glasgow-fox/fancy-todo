const router = require('express').Router()
const controller = require('../controllers/index')

router.get('/', (req, res) => {
    res.send('haloo')
})
router.post('/todos', controller.createTodo)
router.get('/todos', controller.readTodo)
router.get('/todos/:id', controller.getOneTodo)
router.put('/todos/:id', controller.editTodo)
router.patch('/todos/:id', controller.editStatus)
router.delete('/todos/:id', controller.deleteTodo)

module.exports = router