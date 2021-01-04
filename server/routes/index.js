const router = require('express').Router()
const TodoRouter = require('../routes/todoRouter')

// declaring end-points
router.get('/', (req, res) => {
    res.send('This is the homepage todos app!')
})

router.use('/todos', TodoRouter)

module.exports = router 
