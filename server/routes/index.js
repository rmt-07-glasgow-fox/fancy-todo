const router = require('express').Router()
const todoRouter = require('./todo')
const userRouter = require('./user')

router.get('/', (req, res) => {
    res.status(200).json({message: 'masuk index'})
})
router.use('/todo', todoRouter)
router.use(userRouter)

module.exports = router