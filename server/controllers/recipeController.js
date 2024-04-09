require('../models/database');
const category = require('../models/category');

const axios = require('axios');
const key_api = "9c191e5eb0c34564a3c3562ca8084563";

/**
 * GET /
 * Homepage
 */

exports.homepage = async (req, res) => {

  try {

    const limitNumber = 5
    const categories = await category.find({}).limit(limitNumber);

    res.render('index', {title: 'Cooking Blog - Home', categories});
  }catch (error){

    res.status(500).send({message: error.message || "Error occured"});

  }

}


/**
 * GET /
 * /Categories
 * Categories
 */

exports.exploreCategories = async (req, res) => {

  try {

    const limitNumber = 20;
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
  const {query} = req.body;
  const response = await axios.get(`https://api.spoonacular.com/recipes/complexSearch?query=${query}&apiKey=${key_api}`);
  const recipes = response.data.results;
  res.render('search', {title: 'Cooking Blog - Search Results', recipes});
}


/**
 * GET /recipe/:id
 * Recipe
 */

exports.exploreRecipe = async (req, res) => {

  const {id} = req.params;
  const response = await axios.get(`https://api.spoonacular.com/recipes/${id}/information?apiKey=${key_api}`);
  const recipe = response.data;
  res.render('recipe', {recipe})

}






// async function insertDummyCategoryData(){
// try{

//   await category.insertMany( [ 
//     {
//     name: "American",
//     image: "american-food.jpg"
//   },

//   {
//     name: "Chinese",
//     image: "chinese-food.jpg"
//   },

//   {
//     name: "Indian",
//     image: "indian-food.jpg"
//   },

//   {
//     name: "Mexican",
//     image: "mexican-food.jpg"
//   },

//   {
//     name: "Spanish",
//     image: "spanish-food.jpg"
//   },
  
//   {
//     name: "Thai",
//     image: "thai-food.jpg"
//   },

//   ]);

//   console.log('it worked!')

// } catch(error){
//   console.log('err', + error)

//   } 
// }

// insertDummyCategoryData();