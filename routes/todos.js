const router = require('express').Router()
const ControllerTodos = require("../controllers/todos") 

// todos:
router.get("/", ControllerTodos.index) 
router.post("/", ControllerTodos.insert) 
router.get("/:id", ControllerTodos.find) 
router.put("/:id", ControllerTodos.update) 
router.patch("/:id", ControllerTodos.patch)
router.delete("/:id", ControllerTodos.delete) 







module.exports = router