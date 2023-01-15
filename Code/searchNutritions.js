const express = require('express')
const axios = require('axios')
const app = express()
const PORT = 3000

app.use(express.json())

app.get('/recipe', (req, res) => {
    const { diet, excludeIngredients, intolerances } = req.query;

    axios({
        method: 'get',
        url: 'https://spoonacular-recipe-food-nutrition-v1.p.rapidapi.com/recipes/complexSearch',
        headers: {
            "X-RapidAPI-Key": "f1cd362545mshd489e8321a6b603p1b186ajsn697e81eb15c7",
            "X-RapidAPI-Host": "spoonacular-recipe-food-nutrition-v1.p.rapidapi.com"
        },
        params: {
            diet: diet,
            excludeIngredients: excludeIngredients,
            intolerances: intolerances,
            limitLicense: true,
            number: 1,
            offset: 0,
            ranking: 1
        }
    }).then((response) => {
        res.json(response.data)
    }).catch((error) => {
        res.status(500).json({error: error.message})
    })
});

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`)
  })
