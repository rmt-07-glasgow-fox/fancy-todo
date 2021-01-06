const router = require('express').Router()
const TodoController = require("../controllers/todoController")
const {authorize} = require("../middlewares/auth")

router.get(`/`, TodoController.getAll)
router.post(`/`, TodoController.create)

// router.use()

router.get(`/:id`, TodoController.getById)
router.put(`/:id`, TodoController.edit)
router.patch(`/:id`, TodoController.patch)
router.delete('/:id', authorize, TodoController.delete)

module.exports = router