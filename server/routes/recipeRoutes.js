const express = require('express');
const router = express.Router();
const recipeController = require ('../controllers/recipeController');


/**
 * App Routes
 */
router.get('/', recipeController.homepage);
router.get('/categories', recipeController.exploreCategories);
router.post('/search', recipeController.searchRecipe);
router.get('/recipe/:id', recipeController.exploreRecipe);
router.get('/categories/:name', recipeController.exploreSpecificCategory);
router.get('/submit-recipe', recipeController.submitRecipe);
router.post('/submit-recipe', recipeController.submitRecipeOnPost);
router.post('/view', recipeController.viewRecipe);







module.exports = router;
