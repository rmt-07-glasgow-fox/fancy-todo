const router = require("express").Router()
const foodController = require("../controllers/foodController")

router.post("/", foodController.getFoodRecommendation)

module.exports = router