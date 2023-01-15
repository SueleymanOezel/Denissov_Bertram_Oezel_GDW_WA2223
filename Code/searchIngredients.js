const express = require('express')
const axios = require('axios')
const app = express()
const PORT = 3000

app.use(express.json())

app.get('/recipes', (req, res) => {
    const ingredients = req.query.ingredients.split(',') // get ingredients from query parameter
    axios({
      method: 'get',
      url: 'https://spoonacular-recipe-food-nutrition-v1.p.rapidapi.com/recipes/findByIngredients',
      headers: {
        "X-RapidAPI-Key": "f1cd362545mshd489e8321a6b603p1b186ajsn697e81eb15c7", // replace with your API key
        "X-RapidAPI-Host": "spoonacular-recipe-food-nutrition-v1.p.rapidapi.com"
      },
      params: {
        ingredients: ingredients.join(',') // join array into a string
      }
    }).then((response) => {
      res.json(response.data)
    }).catch((error) => {
      res.status(500).json({error: error.message})
    })
  })
  
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`)
  })
