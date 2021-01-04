const router = require('express').Router()
const todosController = require('../controllers/todosController')

// declaring end-points
router.get('/', (req, res) => {
    res.send('This is the homepage of todos app!')
})

router.get('/todos', todosController.getTodos)
router.post('/todos', todosController.postTodos)
router.get('/todos/:id', todosController.getCurrentTodos)
router.put('/todos/:id', todosController.putUpdateTodos)
//router.patch('/todos/:id', todosController.patchUpdateTodos)
//router.delete('/todos/:id', todosController.deleteTodos)

module.exports = router 
