const router = require('express').Router()
const TodoController = require("../controllers/todoController")
const {authorize} = require("../middlewares/auth")

router.get(`/`, TodoController.getAll)
router.post(`/`, TodoController.create)

// router.use()

router.get(`/:id`, authorize, TodoController.getById)
router.put(`/:id`, authorize, TodoController.edit)
router.patch(`/:id`, authorize, TodoController.patch)
router.delete('/:id', authorize, TodoController.delete)

module.exports = router