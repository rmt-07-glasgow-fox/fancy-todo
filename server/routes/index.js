const router = require('express').Router();
const todosRouter = require('./todos');
const authRouter = require('./auth');


router.get('/', (req, res) => {
    res.status(200).send('hello world')
})

router.use(authRouter)
router.use('/todos', todosRouter)


module.exports = router;