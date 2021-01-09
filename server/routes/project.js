const router = require('express').Router()

const ProjectController = require('../controllers/projectController')
const { authorize } = require('../middlewares/auth')

router.get('/', ProjectController.showProject)
router.post('/', ProjectController.createProject)
router.get('/:projectId/members', ProjectController.showMembers)
router.post('/:projectId/add/:userId', ProjectController.addMember)
router.get('/:id', ProjectController.showOne)
router.put('/:id', ProjectController.edit)
router.delete('/:id', ProjectController.delete)

module.exports = router