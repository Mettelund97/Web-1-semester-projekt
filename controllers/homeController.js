
const express = require("express");
const app = express();

const { engine } = require('express-handlebars');
const path = require("path");
app.set('view engine', 'hbs');



// Set up Handlebars as the template engine
app.engine('hbs', engine({
    defaultLayout: 'main',  
    extname: '.hbs'
}));

app.get('/', (reg, res) => {
  res.render('index');
});

/*
exports.getHome = (req, res) => {
  res.sendFile(path.join(__dirname, "../views", "index.html"));
};

*/
