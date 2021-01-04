const todosRouters = require('./todos')
const router = require('express').Router();

router.get('/', (req, res) => {
    return res.status(200).json({
        message: 'hay domo'
    });
})

router.use('/todos', todosRouters)

module.exports = router
