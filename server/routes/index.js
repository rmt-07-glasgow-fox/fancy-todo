const router = require('express').Router()
const UserController = require('../controllers/UserController')
const todoRouter = require('./todoRouter')
const { authenticate } = require('../middlewares/auth')

router.get('/', (req, res) => {
    res.send('This is the homepage todos app!')
})

router.post("/register", UserController.register)
router.post("/login", UserController.login)

router.use('/todos', authenticate, todoRouter)

module.exports = router 
