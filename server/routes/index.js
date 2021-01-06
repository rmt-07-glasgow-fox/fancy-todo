const router = require('express').Router();
const todosRouter = require('./todos');
const userRouter = require('./user');
const weatherRouter = require('./weather')
const { authentication } = require('../middlewares/auth')

router.get('/welcome', (req, res) => {
    res.send(`Hello World`)
})

router.use(userRouter)

router.use('/weather', weatherRouter)

router.use(authentication)

router.use('/todos', todosRouter)


module.exports = router