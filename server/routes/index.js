const router = require('express').Router()
const fancyTodo = require ('./routerFancyTodo') 
const register = require('./routerRegister')


router.use(register)
router.use(fancyTodo)


module.exports = router