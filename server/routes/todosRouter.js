const router = require('express').Router()
const todoController = require('../controllers/todoController')
const { authorize } = require('../middlewares/auth')

router.post('/', todoController.postTodo)
router.get('/', todoController.getTodo)

//router.use(authorize) << kalo ditaro disini, nanti gabisa ngambil req.params.idnya, karena ada di sebelum endpoint
router.get('/:id', authorize, todoController.getTodoById)

router.put('/:id', authorize, todoController.putTodo)
router.patch('/:id', authorize, todoController.patchTodo)
router.delete('/:id', authorize, todoController.deleteTodo)

module.exports = router