const router = require('express').Router()
const toDoRouter = require('./toDo')



router.use('/todos', toDoRouter)



module.exports = router