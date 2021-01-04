const router = require('express').Router()
const todoRouter = require('./todoRoutes')

router.get('/', (req, res) => {
    res.send('<h1 style="text-align:center; margin-top: 20px;"><a href="/todos">ENTER</a></h1>')
})
router.use('/todos', todoRouter)

module.exports = router