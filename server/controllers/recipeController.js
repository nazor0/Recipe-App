require ('../models/database');
const category = require('../models/category');

/**
 * GET /
 * Homepage
 */

exports.homepage = async (req, res) => {

  res.render('index', {title: ''});

}

async function insertDymmyCategoryData (){
try{

  await category.insertMany( [ 
    {
      name: "String",
    image: "thai-food.jpg"
  },

  {
    name: "String",
    image: "thai-food.jpg"
  },

  {
    name: "String",
    image: "thai-food.jpg"
  },

  {
    name: "String",
    image: "thai-food.jpg"
  },

  {
    name: "String",
    image: "thai-food.jpg"
  },
  
  {
    name: "String",
    image: "thai-food.jpg"
  },

  ]);

} catch(error){
  console.log('err', + error)

  } 
}

insertDymmyCategoryData();