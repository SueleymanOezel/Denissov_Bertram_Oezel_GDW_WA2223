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


const users = []

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