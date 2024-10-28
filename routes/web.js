const express = require("express");

const homeController = require("../controllers/homeController");
const settingsController = require("../controllers/settingsController");
const loginController = require("../controllers/loginController");
const addNewMemberController = require("../controllers/addNewMemberController");
const groupAdministrationController = require("../controllers/groupAdministrationController");
const createNewGroupController = require("../controllers/createNewGroupController");
const startNewProjectController = require("../controllers/startNewProjectController");

const router = express.Router();

router.get("/", homeController.getHome);
router.get("/settings", settingsController.getSettings);
router.get("/login", loginController.getLogin);
router.get("/add-new-member", addNewMemberController.getAddNewMember);
router.get(
  "/group-administration",
  groupAdministrationController.getGroupAdministration
);
router.get("/create-new-group", createNewGroupController.getCreateNewGroup);
router.get("/start-new-project", startNewProjectController.getStartNewProject);

module.exports = router;
