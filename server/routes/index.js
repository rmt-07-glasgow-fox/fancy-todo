const router = require('express').Router()
const fancyTodo = require ('./routerFancyTodo') 

router.use(fancyTodo)


module.exports = router