const router = require('express').Router();
const todosRouter = require('./todos');

router.get('/', (req, res) => {
    res.status(200).send('hello world')
})

router.use('/todos', todosRouter)

module.exports = router;