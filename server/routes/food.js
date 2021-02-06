const router = require("express").Router()
const foodController = require("../controllers/foodController")

router.get("/", foodController.getFoodRecommendation)

module.exports = router