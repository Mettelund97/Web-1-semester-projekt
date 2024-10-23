const express = require("express");
const exphbs = require("express-handlebars");
const app = express();

const path = require("path");
const PORT = 3000;
app.use(express.json());

app.engine(
  "hbs",
  exphbs.engine({
    extname: "hbs",
    defaultLayout: "main",
    layoutsDir: path.join(__dirname, "views/layouts"),
    partialsDir: path.join(__dirname, "views/partials"),
  })
);
app.set("view engine", "hbs");

// Static files middleware
app.use(express.static(path.join(__dirname, "public")));

const homeController = require("./controllers/homeController");
const settingsController = require("./controllers/settingsController");
const loginController = require("./controllers/loginController");
const addNewMemberController = require("./controllers/addNewMemberController");
const groupAdministrationController = require("./controllers/groupAdministrationController");
const createNewGroupController = require("./controllers/createNewGroupController");
const startNewProjectController = require("./controllers/startNewProjectController");

app.get("/", homeController.getHome);
app.get("/settings", settingsController.getSettings);
app.get("/login", loginController.getLogin);
app.get("/add-new-member", addNewMemberController.getAddNewMember);
app.get(
  "/group-administration",
  groupAdministrationController.getGroupAdministration
);
app.get("/create-new-group", createNewGroupController.getCreateNewGroup);
app.get("/start-new-project", startNewProjectController.getStartNewProject);

app.use((req, res, next) => {
  res.status(404).send("Page not found");
});

app.listen(PORT, () => {
  if (!PORT) {
    console.error("The server is NOT running!");
  }
  console.log(`The server is running on port ${PORT}`);
});
