const express = require('express');
const router = express.Router();
const recipeController = require ('../controllers/recipeController');

//Spoonacular API 

const key_api = "9c191e5eb0c34564a3c3562ca8084563";

/**
 * App Routes
 */
router.get('/', recipeController.homepage);
router.get('/categories', recipeController.exploreCategories);
router.post('/search', recipeController.searchRecipe);
router.get('/recipe/:id', recipeController.exploreRecipe);

module.exports = router;
