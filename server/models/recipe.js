// const mongoose = require('mongoose');

// const recipeSchema = new mongoose.Schema({
//   name: {
//     type: String,
//     required: 'This field is required.'
//   },

//   description: {
//     type: String,
//     required: 'This field is required.'
//   },

//   email: {
//     type: String,
//     required: 'This field is required'
//   },

//   ingredients: {
//     type: Array,
//     required: 'This field is required.'
//   },
  
//   category: {
//     type: String,
//     enum: ['African', 'Asian', 'American', 'British', 'Cajun', 'Caribbean', 'Chinese', 'Eastern European', 'European', 'French', 'German', 'Greek', 'Indian', 'Irish', 'Italian', 'Japanese', 'Jewish', 'Korean', 'Latin American', 'Mexican', 'Mediterraneann', 'Middle Eastern', 'Nordic', 'Southen', 'Spanish', 'Thai', 'Vietnamese'],
//     required: 'This field is required.'
//   },

//   image: {
//     type: String,
//     required: 'This field is required.'
//   }
// });

// recipeSchema.index({ name: 'text', description: 'text' });
// // WildCard Indexing
// // recipeSchema.index({ "$**" : 'text' });

// module.exports = mongoose.model('Recipe', recipeSchema);







const mongoose = require('mongoose');

const recipeSchema = new mongoose.Schema({
  name: {
    type: String,
    required: 'This field is required.'
  },
  description: {
    type: String,
    required: 'This field is required.'
  },
  email: {
    type: String,
    required: 'This field is required.'
  },
  ingredients: {
    type: Array,
    required: 'This field is required.'
  },
  category: {
    type: String,
    enum: ['Thai', 'American', 'Chinese', 'Mexican', 'Indian'],
    required: 'This field is required.'
  },
  image: {
    type: String,
    required: 'This field is required.'
  },
});

recipeSchema.index({ name: 'text', description: 'text' });
// WildCard Indexing
//recipeSchema.index({ "$**" : 'text' });

module.exports = mongoose.model('Recipe', recipeSchema);