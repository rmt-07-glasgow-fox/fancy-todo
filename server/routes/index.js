const router = require('express').Router();
const todosRouter = require('./todos');
const authRouter = require('./auth');

router.get('/welcome', (req, res) => {
    res.send(`Hello World`)
})

router.use(authRouter)

router.use('/todos', todosRouter)

module.exports = router