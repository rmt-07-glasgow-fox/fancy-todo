const router = require('express').Router()
const fancyTodo = require ('./routerFancyTodo') 
const register = require('./routerRegister')
const weather = require('./routerWeather')
const Auth = require('../middlewares/auth')


router.get('/welcome', (req, res)=> {
    res.send('Hello  World')
})

router.use(register)
router.use(Auth.authentication)
router.use(fancyTodo)
router.use(weather)




module.exports = router