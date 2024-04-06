require('../models/database');
const category = require('../models/category');

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

// async function insertDummyCategoryData (){
// try{

//   await category.insertMany( [ 
//     {
//     "name": "American",
//     image: "american-food.jpg"
//   },

//   {
//     "name": "Chinese",
//     image: "chinese-food.jpg"
//   },

//   {
//     "name": "Indian",
//     image: "indian-food.jpg"
//   },

//   {
//     "name": "Mexican",
//     image: "mexican-food.jpg"
//   },

//   {
//     "name": "Spanish",
//     image: "spanish-food.jpg"
//   },
  
//   {
//     "name": "Thai",
//     image: "thai-food.jpg"
//   },

//   ]);

// } catch(error){
//   console.log('err', + error)

//   } 
// }

// insertDummyCategoryData();