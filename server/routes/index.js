const router = require('express').Router()
const todoRouter = require('./todoRouter')

const Controller = require('../controller/todoController.js')

router.get('/', (req, res) => {
    res.send('hello, todo App')
})
router.use('/todos', todoRouter)


module.exports = router

