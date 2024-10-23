const express = require("express");
const app = express();

const { engine } = require('express-handlebars');


const path = require("path");
const PORT = 3000;
app.use(express.json());


app.set('view engine', 'hbs');


// Set up Handlebars as the template engine
app.engine('hbs', engine({
    defaultLayout: 'main',  
    extname: '.hbs'
}));




// Static files middleware
app.use(express.static(path.join(__dirname, "public")));


const homeController = require("./controllers/homeController");
/*
const settingsController = require("./controllers/settingsController");
const loginController = require("./controllers/loginController");
const addNewMemberController = require("./controllers/addNewMemberController");
const groupAdministrationController = require("./controllers/groupAdministrationController");
const createNewGroupController = require("./controllers/createNewGroupController");
const startNewProjectController = require("./controllers/startNewProjectController");
*/
app.get("/", homeController.getHome);


/*
app.get("/settings", settingsController.getSettings);
app.get("/login", loginController.getLogin);
app.get("/add-new-member", addNewMemberController.getAddNewMember);
app.get(
  "/group-administration",
  groupAdministrationController.getGroupAdministration
);
app.get("/create-new-group", createNewGroupController.getCreateNewGroup);
app.get("/start-new-project", startNewProjectController.getStartNewProject);
*/

/* handlebars */


app.get('/addNewMembers', (reg, res) => {
  res.render('addNewMembers');
});

app.get('/createNewGroup', (reg, res) => {
  res.render('createNewGroup');
});

app.get('/index', (reg, res) => {
  res.render('index');
});

app.get('/settings', (reg, res) => {
  res.render('settings');
});

app.get('/startNewProject', (reg, res) => {
  res.render('startNewProject');
});


 /* */


app.use((req, res, next) => {
  res.status(404).send("Page not found");
});

app.listen(PORT, () => {
  if (!PORT) {
    console.error("The server is NOT running!");
  }
  console.log(`The server is running on port ${PORT}`);
});
