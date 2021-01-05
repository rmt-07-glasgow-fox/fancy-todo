const router = require('express').Router();
const todosRouters = require('./todos')
const authRouters = require('./auth')

router.get('/', (req, res) => {
    return res.status(200).json({
        message: 'hay domo'
    });
})

router.use('/todos', todosRouters)
router.use(authRouters)

module.exports = router
