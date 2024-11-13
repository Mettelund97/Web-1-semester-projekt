const express = require("express");
const authController = require("../controllers/authController");
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

// // linje 16 skal slettes senere, er der kun for testing
// // router.get("/user/:id", userController.getUserById);

// // altid efterfulgt af "/urlen", så start med userController.getAllUsers hvis man skal bruge data fra user osv.
// // og ikke homeController.getHome først.

router.get("/login", loginController.getLogin);
router.post("/login", loginController.login);

// Alt herunder er beskyttet routes vha: "ensureAuthenticated"
router.get(
  "/",
  authController.ensureAuthenticated,
  userController.getAllUsers,
  homeController.getHome
);

router.get(
  "/settings",
  authController.ensureAuthenticated,
  userController.getUserById,
  settingsController.getSettings
);

router.put(
  "/user/:id/role",
  authController.ensureAuthenticated,
  userController.updateUserRole
);

router.get(
  "/members",
  authController.ensureAuthenticated,
  userController.getAllUsers,
  roleController.getAllRoles,
  membersController.getMembers
);

router.get(
  "/add-new-member",
  authController.ensureAuthenticated,
  roleController.getAllRoles,
  groupController.getAllGroups,
  addNewMemberController.getAddNewMember
);

router.post(
  "/add-new-member",
  authController.ensureAuthenticated,
  userController.createNewUser
);

router.get(
  "/group-administration",
  authController.ensureAuthenticated,
  groupAdministrationController.getGroupAdministration
);

router.get(
  "/create-new-group",
  authController.ensureAuthenticated,
  createNewGroupController.getCreateNewGroup
);

router.get(
  "/start-new-project",
  authController.ensureAuthenticated,
  startNewProjectController.getStartNewProject
);

module.exports = router;
