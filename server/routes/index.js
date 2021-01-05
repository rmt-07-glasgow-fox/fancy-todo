const router = require('express').Router();
const todosRouter = require('./todos');
const authRouter = require('./auth');
const { authentication } = require('../middlewares/auth')

router.get('/welcome', (req, res) => {
    res.send(`Hello World`)
})

router.use(authRouter)

router.use(authentication)

router.use('/todos', todosRouter)

module.exports = router