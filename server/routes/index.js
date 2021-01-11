const router = require('express').Router();
const todosRouter = require('./todos');
const projectRouter = require('./project');

const authRouter = require('./auth');
const isLogin = require('../middlewares/isLogin')

router.get('/', (req, res) => {
    res.status(200).send('hello world')
})

router.use(authRouter)
router.use(isLogin)
router.use('/todos', todosRouter)
router.use('/project', projectRouter)



module.exports = router;