require('../models/database');
const Category = require('../models/Category');
const Recipe = require('../models/Recipe');

const axios = require('axios');
const key_api = "8f3228ee857245b794de5a9d1a773b1d"; //9c191e5eb0c34564a3c3562ca8084563

/**
 * GET /
 * Homepage 
*/
exports.homepage = async (req, res) => {
  try {
    const limitNumber = 5
    const categories = await Category.find({}).limit(limitNumber);
    const mine = await Recipe.find({}).sort({_id: -1}).limit(limitNumber);
   
    const food = { mine };

    res.render('index', {title: 'Home', categories, food});
  } catch (error) {
    res.status(500).send({message: error.message || "Error occured"});
  }
}

/**
 * GET /categories
 * Categories 
*/
exports.exploreCategories = async(req, res) => {
  try {
    const limitNumber = 30;
    const categories = await Category.find({}).limit(limitNumber);
    res.render('categories', { title: 'Cooking Blog - Categories', categories } );
  } catch (error) {
    res.status(500).send({message: error.message || "Error Occured" });
  }
} 


/**
 * GET /categories/:name
 * Recipes by Category
 */
exports.exploreSpecificCategory = async (req, res) => {
  try {
    const cuisine = `${req.params.name}`;
    const response = await axios.get(`https://api.spoonacular.com/recipes/complexSearch?cuisine=${cuisine}&apiKey=${key_api}`);
    const recipes = response.data.results;
    res.render('searchCategory', {title: `${cuisine} Recipes`, recipes});
  } catch (error){
    res.status(500).send({message: error.message || "Error occured"});
  }
}
 
/**
 * GET /recipe/:id
 * Recipe Spoonacular
 */
exports.exploreRecipe = async (req, res) => {
  try {
    const {id} = req.params;
    const response = await axios.get(`https://api.spoonacular.com/recipes/${id}/information?apiKey=${key_api}`);
    const recipe = response.data;
    res.render('recipe', {title: recipe.title, recipe})
  } catch (error) {
  res.status(500).send({message: error.message || "Error occured"});
  }
}


/**
 * POST /search
 * Search 
*/
exports.searchRecipe = async (req, res) => {
  try {
    const {query} = req.body;
    const response = await axios.get(`https://api.spoonacular.com/recipes/complexSearch?query=${query}&apiKey=${key_api}`);
    const recipes = response.data.results;
    res.render('search', {title: 'Search Results', recipes});
  } catch (error) {
    res.status(500).send({message: error.message || "Error occured"});
  }
}

/**
 * GET /explore-mine
 * Explore mine 
*/
exports.exploreMine = async(req, res) => {
  try {
    const limitNumber = 20;
    const recipe = await Recipe.find({}).sort({ _id: -1 }).limit(limitNumber);
    res.render('explore-mine', { title: 'Cooking Blog - Explore mine', recipe } );
  } catch (error) {
    res.satus(500).send({message: error.message || "Error Occured" });
  }
} 

/**
 * GET /recipeMine/:id
 * Recipe Mine
*/
exports.exploreRecipeMine = async(req, res) => {
  try {
    let recipeId = req.params.id;
    const recipe = await Recipe.findById(recipeId);
    res.render('recipeMine', { title: recipe.name, recipe } );
  } catch (error) {
    res.status(500).send({message: error.message || "Error Occured" });
  }
} 

/**
 * GET /submit-recipe
 * Submit Recipe
*/
exports.submitRecipe = async(req, res) => {
  const infoErrorsObj = req.flash('infoErrors');
  const infoSubmitObj = req.flash('infoSubmit');
  res.render('submit-recipe', { title: 'Cooking Blog - Submit Recipe', infoErrorsObj, infoSubmitObj  } );
}

/**
 * POST /submit-recipe
 * Submit Recipe
*/
exports.submitRecipeOnPost = async(req, res) => {
  try {

    let imageUploadFile;
    let uploadPath;
    let newImageName;

    if(!req.files || Object.keys(req.files).length === 0){
      console.log('No files were uploaded.');
    } else {

      imageUploadFile = req.files.image;
      newImageName = Date.now() + imageUploadFile.name;

      uploadPath = require('path').resolve('./') + '/public/uploads/' + newImageName;

      imageUploadFile.mv(uploadPath, function(err){
        if(err) return res.satus(500).send(err);
      })

    }

    const newRecipe = new Recipe({
      name: req.body.name,
      description: req.body.description,
      email: req.body.email,
      ingredients: req.body.ingredients,
      category: req.body.category,
      image: newImageName
    });
    
    await newRecipe.save();

    req.flash('infoSubmit', 'Recipe has been added.')
    res.redirect('/submit-recipe');
  } catch (error) {
    // res.json(error);
    req.flash('infoErrors', error);
    res.redirect('/submit-recipe');
  }
}