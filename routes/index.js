const router = require('express').Router()
const TaskController = require('../controller/TaskController')
const authRouter = require('./auth')

router.use(authRouter)
router.get('/', TaskController.home)
router.get('/todos', TaskController.getTodo)
router.post('/todos', TaskController.postTodo)
router.get('/todos/edit/:id', TaskController.editTodo)
router.post('/todos/edit/:id', TaskController.editTodoPost)
router.get('/todos/delete/:id', TaskController.deleteTodo)
router.get('/login', TaskController.login)
router.post('/login', TaskController.postLogin)

module.exports = router
