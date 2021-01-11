const router = require('express').Router()
const Controller = require('../controllers/todoController')
const auth = require('./auth')
const todo = require('./todo')
const {authentication} = require('../middlewares/auth')

router.get('/home', Controller.home)


router.use(auth)
router.use(authentication)
router.use('/todos', todo)


module.exports = router