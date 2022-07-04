const express = require('express');
const exphbs = require('express-handlebars');
// const bodyparser = require('body-parser');


require('dotenv').config();
const app = express();
const port = process.env.PORT || 5000;

//parsing middleware
app.use(express.urlencoded({extended:true}))


//parse application
app.use(express.json());


// for use static files
app.use(express.static('public'));


const handlebars = exphbs.create({ extname: '.hbs',});

//set templating engine
app.engine('.hbs', handlebars.engine);
app.set('view engine','hbs');


//specifying Routes----including in user.js
const routes = require('./server/routes/user');
app.use('/',routes);

app.listen(port,()=>{
    console.log(`app listening on port http://localhost:${port}`);
})
