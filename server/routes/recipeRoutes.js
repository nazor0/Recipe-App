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

module.exports = router;
