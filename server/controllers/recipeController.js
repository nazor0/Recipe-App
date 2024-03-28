require('../models/database');
const Category = require('../models/Category'); 


/**
 * GET /
 * Homepage
 */
exports.homepage = async(req, res) => {
    res.render('index', { title: 'Recipe App - Home'});
}


async function insertmyCategoryData(){
    try {
        await Category.insertMany(
            {
                "name": "American",
                "image": "american.jpg"
            },
            {
                "name": "Indian",
                "image": "indian.jpg"
            },
            {
                "name": "Italian",
                "image": "italian.jpg"
            },
            {
                "name": "Nigerian",
                "image": "jollof.jpg"
            },
            {
                "name": "Mexican",
                "image": "mex.jpg"
            },
            {
                "name": "French",
                "image": "croissant.jpg"
            },
        );
    } catch (error){
        console.log('err', + error);
    }
}

insertmyCategoryData();