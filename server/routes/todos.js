const router = require('express').Router()
const ControllerTodos = require("../controllers/todos") 
const { authorize } = require('../middleware/auth')

// todos:
router.get("/", ControllerTodos.findTodos) 
router.post("/", ControllerTodos.insert) 
router.get("/:id", authorize, ControllerTodos.findOne) 
router.put("/:id", authorize, ControllerTodos.update) 
router.patch("/:id", authorize, ControllerTodos.patch)
router.delete("/:id", authorize, ControllerTodos.delete) 


module.exports = router