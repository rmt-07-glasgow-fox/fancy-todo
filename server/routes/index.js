const router = require('express').Router()
const toDoRouter = require('./toDo')
const userRouter = require('./user')




router.use('/todos', toDoRouter)
router.use( userRouter)





module.exports = router