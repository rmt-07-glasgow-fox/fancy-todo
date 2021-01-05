const router = require('express').Router()
const fancyTodo = require ('./routerFancyTodo') 
const register = require('./routerRegister')
const Auth = require('../middlewares/auth')


router.get('/welcome', (req, res)=> {
    res.send('Hello World')
})

router.use(register)
router.use(Auth.authentication)
router.use(fancyTodo)


module.exports = router