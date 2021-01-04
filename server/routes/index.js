const router = require('express').Router()
const todoController = require('../controllers')

router.get(`/`, (req, res) => {
    res.send(`test`)
})

router.get('/todos', todoController.showAll);

router.post('/todos', todoController.add);

router.get('/todos/:id', todoController.showOne);

router.put('/todos/:id', todoController.edit);

router.patch('/todos/:id', todoController.editStatus);

router.delete('/todos/:id', todoController.delete);

module.exports = router