const router = require('express').Router()
const todoRouter = require('./todo')
const userRouter = require('./user')
const { authentication } = require('../middlewares/auth')

router.get('/', (req, res) => {
    res.status(200).json({message: 'masuk index'})
})
router.use(userRouter)
router.use(authentication)
router.use('/todo', todoRouter)

module.exports = router