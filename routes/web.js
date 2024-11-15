const express = require("express");

const homeController = require("../controllers/homeController");
const settingsController = require("../controllers/settingsController");
const loginController = require("../controllers/loginController");
const addNewMemberController = require("../controllers/addNewMemberController");
const groupAdministrationController = require("../controllers/groupAdministrationController");
const createNewGroupController = require("../controllers/createNewGroupController");
const startNewProjectController = require("../controllers/startNewProjectController");
const userController = require("../controllers/UserController");
const roleController = require("../controllers/roleController");
const groupController = require("../controllers/groupController");
const membersController = require("../controllers/membersController");
const router = express.Router();

// linje 16 skal slettes senere, er der kun for testing
router.get("/user/:id", userController.getUserById);

// altid efterfulgt af "/urlen", så start med userController.getAllUsers hvis man skal bruge data fra user osv.
// og ikke homeController.getHome først.
router.get("/", userController.getAllUsers, homeController.getHome);
router.get("/settings", settingsController.getSettings);
router.get("/login", loginController.getLogin);

// Update
router.put("/user/:id/role", userController.updateUserRole);

router.get(
  "/members",
  userController.getAllUsers,
  roleController.getAllRoles,
  membersController.getMembers
);

router.get(
  "/add-new-member",
  roleController.getAllRoles,
  groupController.getAllGroups,
  addNewMemberController.getAddNewMember
);
router.post("/add-new-member", userController.createNewUser);

router.get(
  "/group-administration",
  groupController.getAllGroups,
  groupAdministrationController.getGroupAdministration
);

router.post("/group-administration", groupController.createNewGroup);

router.get("/create-new-group", createNewGroupController.getCreateNewGroup);
router.post("/create-new-group", groupController.createNewGroup);


router.get("/start-new-project", startNewProjectController.getStartNewProject);

module.exports = router;
