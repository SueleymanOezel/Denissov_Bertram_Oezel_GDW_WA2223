const express = require('express')
const axios = require('axios')
const app = express()
const PORT = 3001


const users = []

app.get('/', (req, res) => {
  res.json({ message: 'Welcome to my server', availableRoutes: ['/users', '/ingredients', '/nutrition'] });
});


// create a user
app.post('/users', (req, res) => {
  const user = req.body
  users.push(user)
  res.json({ message: 'User created successfully', user })
})

// get all users
app.get('/users', (req, res) => {
  res.json(users)
})

// get a user by id
app.get('/users/:id', (req, res) => {
  const user = users.find((u) => u.id === req.params.id)
  if (!user) {
    return res.status(404).json({ message: 'User not found' })
  }
  res.json(user)
})

// update a user by id
app.put('/users/:id', (req, res) => {
  const userIndex = users.findIndex((u) => u.id === req.params.id)
  if (userIndex === -1) {
    return res.status(404).json({ message: 'User not found' })
  }
  const updatedUser = { ...users[userIndex], ...req.body }
  users[userIndex] = updatedUser
  res.json({ message: 'User updated successfully', updatedUser })
})

// delete a user by id
app.delete('/users/:id', (req, res) => {
  const userIndex = users.findIndex((u) => u.id === req.params.id)
  if (userIndex === -1) {
    return res.status(404).json({ message: 'User not found' })
  }
  users.splice(userIndex, 1)
  res.json({ message: 'User deleted successfully' })
})


const ingredients = []

// create an ingredient
app.post('/ingredients', (req, res) => {
  const ingredient = req.body
  ingredients.push(ingredient)
  res.json({ message: 'Ingredient created successfully', ingredient })
})

// get all ingredients
app.get('/ingredients', (req, res) => {
  res.json(ingredients)
})

// get an ingredient by id
app.get('/ingredients/:id', (req, res) => {
  const ingredient = ingredients.find((i) => i.id === req.params.id)
  if (!ingredient) {
    return res.status(404).json({ message: 'Ingredient not found' })
  }
  res.json(ingredient)
})

// update an ingredient by id
app.put('/ingredients/:id', (req, res) => {
  const ingredientIndex = ingredients.findIndex((i) => i.id === req.params.id)
  if (ingredientIndex === -1) {
    return res.status(404).json({ message: 'Ingredient not found' })
  }
  const updatedIngredient = { ...ingredients[ingredientIndex], ...req.body }
  ingredients[ingredientIndex] = updatedIngredient
  res.json({ message: 'Ingredient updated successfully', updatedIngredient })
  })
  
  // delete an ingredient by id
  app.delete('/ingredients/:id', (req, res) => {
  const ingredientIndex = ingredients.findIndex((i) => i.id === req.params.id)
  if (ingredientIndex === -1) {
  return res.status(404).json({ message: 'Ingredient not found' })
  }
  ingredients.splice(ingredientIndex, 1)
  res.json({ message: 'Ingredient deleted successfully' })
  })

  const nutrition = []

// create an nutrition
app.post('/nutrition', (req, res) => {
  const nutr = req.body
  nutrition.push(nutr)
  res.json({ message: 'Nutrition created successfully', nutr })
})

// get all nutrition
app.get('/nutrition', (req, res) => {
  res.json(nutrition)
})

// get an nutrition by id
app.get('/nutrition/:id', (req, res) => {
  const nutr = nutrition.find((i) => i.id === req.params.id)
  if (!nutr) {
    return res.status(404).json({ message: 'Nutrition not found' })
  }
  res.json(nutr)
})

// update an nutrition by id
app.put('/nutrition/:id', (req, res) => {
  const nutritionIndex = nutrition.findIndex((i) => i.id === req.params.id)
  if (nutritionIndex === -1) {
    return res.status(404).json({ message: 'Nutrition not found' })
  }
  const updatedNutrition = { ...nutrition[nutritionIndex], ...req.body }
  nutrition[nutritionIndex] = updatedNutrition
  res.json({ message: 'Nutrition updated successfully', updatedNutrition })
})

// delete an nutrition by id
app.delete('/nutrition/:id', (req, res) => {
  const nutritionIndex = nutrition.findIndex((i) => i.id === req.params.id)
  if (nutritionIndex === -1) {
    return res.status(404).json({ message: 'Nutrition not found' })
  }
  nutrition.splice(nutritionIndex, 1)
  res.json({ message: 'Nutrition deleted successfully' })
  })

  const recipes = []

  // create a recipe
  app.post('/recipes', (req, res) => {
  const recipe = req.body
  recipes.push(recipe)
  res.json({ message: 'Recipe created successfully', recipe })
  })
  
  // get a recipe by ingredients
  app.get('/recipes', (req, res) => {
  const recipe = recipes.find((r) => r.ingredients === req.query.ingredients)
  if (!recipe) {
  return res.status(404).json({ message: 'Recipe not found' })
  }
  res.json(recipe)
  })


  app.get('/recipeIngredients', (req, res) => {
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
  
  app.get('/recipeNutrition', (req, res) => {
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

  
  app.get('/', (req, res) => {
    res.json({
      message: 'Welcome to my server',
      availableRoutes: ['/users', '/ingredients', '/nutrition', '/recipeIngredients', '/recipeNutrition']
    });
  });

  app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`)
  });





