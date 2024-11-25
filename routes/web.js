const express = require("express");
const authController = require("../controllers/authController");
const loginController = require("../controllers/loginController");
const logoutController = require("../controllers/logoutController");
const homeController = require("../controllers/homeController");
const settingsController = require("../controllers/settingsController");
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
router.get("/logout", logoutController.logout);

// Alt herunder er beskyttet routes vha: "protectedRoutes"
router.get(
  "/",
  authController.protectedRoutes,
  userController.getAllUsers,
  homeController.getHome
);

router.get(
  "/settings",
  authController.protectedRoutes,
  userController.getUserById,
  settingsController.getSettings
);

router.put(
  "/user/:id/role",
  authController.protectedRoutes,
  userController.updateUserRole
);

router.get(
  "/members",
  authController.protectedRoutes,
  authController.authorizeRole(1),
  userController.getAllUsers,
  roleController.getAllRoles,
  membersController.getMembers
);

router.get(
  "/add-new-member",
  authController.protectedRoutes,
  authController.authorizeRole(1),
  roleController.getAllRoles,
  groupController.getAllGroups,
  addNewMemberController.getAddNewMember
);

router.post(
  "/add-new-member",
  authController.protectedRoutes,
  authController.authorizeRole(1),
  userController.createNewUser
);

router.get(
  "/group-administration",
  authController.protectedRoutes,
  groupAdministrationController.getGroupAdministration
);

router.get(
  "/create-new-group",
  authController.protectedRoutes,
  createNewGroupController.getCreateNewGroup
);

router.get(
  "/start-new-project",
  authController.protectedRoutes,
  startNewProjectController.getStartNewProject
);

module.exports = router;
