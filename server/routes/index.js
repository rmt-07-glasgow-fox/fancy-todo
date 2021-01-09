const router = require('express').Router()
const toDoRouter = require('./toDo')
const userRouter = require('./user')
const Weather = require('../controllers/weatherController')




router.use('/todos', toDoRouter)
router.use( userRouter)
router.get('/weather', Weather.weather)





module.exports = router