const router = require("express").Router()
const controllerSchedule = require("../controllers/schedule.js")

router.use('/', controllerSchedule.readSchedule)
router.use('/:idSchedule', controllerSchedule.createSchedule)
router.post('/:idSchedule', controllerSchedule.createSchedulePost)
router.put('/:idSchedule', controllerSchedule.updateSchedule)
router.put('/:idSchedule', controllerSchedule.updateSchedulePost)
router.delete('/:idSchedule', controllerSchedule.deleteSchedule)

module.exports = router