const router = require('express').Router()
const ControllerTodos = require("../controllers/todos") 
const { authenticate } = require('../middleware/auth')

router.get("/status", authenticate, ControllerTodos.findStatus) 




module.exports = router