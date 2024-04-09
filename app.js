const express = require ('express');
const expressLayouts = require ('express-ejs-layouts');


const app = express();
const port = process.env.PORT || 3000;
const key_api = "9c191e5eb0c34564a3c3562ca8084563";

require ('dotenv').config();
app.use(express.urlencoded( {extended: false} ));
app.use(express.static('public'));
app.use(expressLayouts);

app.set('layout', './layouts/main');
app.set('view engine', 'ejs');

const routes = require('./server/routes/recipeRoutes.js');
app.use('/', routes);

app.listen(port, ()=> console.log(`Listening to port ${port}` ));
