const axios = require('axios')
const e = require('express')
const APP_ID = process.env.APP_ID
const APP_KEY = process.env.APP_KEY

class foodController {
    static getFoodRecommendation(req,res) {
        const diet = req.query.diet
        let foodUrl = `https://api.edamam.com/search?q=&app_id=${APP_ID}&app_key=${APP_KEY}&diet=${diet}`
        let url = null
        for (let i = 0; i < foodUrl.length; i++) {
            if (foodUrl[i] !== '"') {
                url += foodUrl[i]
            }
        }
        axios.get(url)
        .then(response => {
            let foodRecommendation = response.data.hits.map(el => {  //destructure el.recipe
                return {
                    image: el.recipe.image,
                    recipe: el.recipe.label,
                    category: el.recipe.healthLabels,
                    ingredients: el.recipe.ingredients,
                    calories: el.recipe.calories,
                    totalWeight: el.recipe.totalWeight
                }
            })
            res.status(200).json(foodRecommendation)
        })
        .catch(err => {
            res.status(500).json(err)})
    }

}

module.exports = foodController