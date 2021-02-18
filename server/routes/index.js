const router = require('express').Router();
const todosRouters = require('./todos')
const authRouters = require('./auth')
const covidRouters = require('./covid')
const {authentication} = require('../middlewares/middlewares')

router.get('/', (req, res) => {
    return res.status(200).json({
        message: 'hay domo'
    });
})

router.use('/covid', covidRouters)
router.use(authRouters)
router.use(authentication)
router.use('/todos', todosRouters)

module.exports = router
