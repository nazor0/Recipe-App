require('../models/database');
const category = require('../models/category');
const recipe = require ('../models/recipe');

const axios = require('axios');
const key_api = "8f3228ee857245b794de5a9d1a773b1d"; //9c191e5eb0c34564a3c3562ca8084563

/**
 * GET /
 * Homepage
 */

exports.homepage = async (req, res) => {

  try {

    const limitNumber = 5
    const categories = await category.find({}).limit(limitNumber);
    const latest= await recipe.find({}).sort({_id: -1}).limit(limitNumber);

    const food = { latest };


    res.render('index', {title: 'Cooking Blog - Home', categories, food});
  }catch (error){

    res.status(500).send({message: error.message || "Error occured"});

  }

}


/**
 * GET /categories
 * Categories
 */

exports.exploreCategories = async (req, res) => {

  try {

    const limitNumber = 50;
    const categories = await category.find({}).limit(limitNumber);

    res.render('categories', {title: 'Cooking Blog - Categories', categories});
  } catch (error){

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

  res.render('search', {title: 'Cooking Blog - Search Results', recipes});
  } catch (error) {
    
    res.status(500).send({message: error.message || "Error occured"});

  }
}


/**
 * GET /recipe/:id
 * Recipe
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
 * GET /categories/:name
 * Recipes by Category
 */

exports.exploreSpecificCategory = async (req, res) => {

  try {

    const cuisine = `${req.params.name}`;
    const response = await axios.get(`https://api.spoonacular.com/recipes/complexSearch?cuisine=${cuisine}&apiKey=${key_api}`);
    const recipes = response.data.results;

    res.render('searchCategory', {title: `Cooking Blog - ${cuisine} Recipes`, recipes});
  } catch (error){

    res.status(500).send({message: error.message || "Error occured"});

  }
}

/**
 * GET /explore-random
 * Submit Recipe
 */

exports.submitRecipe = async (req,res) =>{

  const infoErrorsObj = req.flash('infoErrors');
  const infoSubmitObj = req.flash('infoSubmit');


  res.render('submit-recipe', {title: `Cooking Blog - Submit Recipe`, infoErrorsObj,infoSubmitObj });

}

/**
 * post /submit-recipe
 * Submit Recipe
 */

exports.submitRecipeOnPost = async (req,res) =>{

  try {

    const newRecipe = new Recipe ({

      name: req.body.name,
      description : req.body.description,
      email: req.body.email,
      ingredients: req.body.ingredients,
      category: req.body.category,
      image: 'african-food.jpg'


    });



    await newRecipe.save();



    req.flash('infoSubmit', 'Recipe has been added');
    res.redirect('/submit-recipe');

  } catch (error)
{
  // res.json(error);
  req.flash('infoErrors', error);
  res.redirect ('/submit-recipe');



}  
  

}