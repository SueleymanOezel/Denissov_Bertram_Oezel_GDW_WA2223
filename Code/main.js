const express = require('express')
const axios = require('axios')
const app = express()
const PORT = 3000

app.get('/recipes', (req, res) => {
  axios({
    method: 'get',
    url: 'https://spoonacular-recipe-food-nutrition-v1.p.rapidapi.com/recipes/findByIngredients',
    headers: {
      "X-RapidAPI-Key": "f1cd362545mshd489e8321a6b603p1b186ajsn697e81eb15c7",
      "X-RapidAPI-Host": "spoonacular-recipe-food-nutrition-v1.p.rapidapi.com"
    },
    params: {
      ingredients: req.query.ingredients
    }
  }).then((response) => {
    res.json(response.data)
  }).catch((error) => {
    res.status(500).json({error: error.message})
  })
})

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`)
})
