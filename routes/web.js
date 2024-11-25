const express = require("express");
const authController = require("../controllers/authController");
const loginController = require("../controllers/loginController");
const logoutController = require("../controllers/logoutController");
const homeController = require("../controllers/homeController");
const settingsController = require("../controllers/settingsController");
const addNewMemberController = require("../controllers/addNewMemberController");
const groupAdministrationController = require("../controllers/groupAdministrationController");
const createNewGroupController = require("../controllers/createNewGroupController");
/* const startNewProjectController = require("../controllers/startNewProjectController"); */
const userController = require("../controllers/UserController");
const roleController = require("../controllers/roleController");
const groupController = require("../controllers/groupController");
const membersController = require("../controllers/membersController");
const stackController = require('../controllers/stackController');

const router = express.Router();

router.get("/login", loginController.getLogin);
router.post("/login", loginController.login);
router.get("/logout", logoutController.logout);

// Alt herunder er beskyttet routes vha: "protectedRoutes"

//Projects
router.get("/",
  authController.protectedRoutes, 
  userController.getAllUsers,
  stackController.getAllStacks, 
  homeController.getHome
);

router.get(
  "/start-new-project",
  authController.protectedRoutes,
  stackController.getStartNewProject
);

router.post("/start-new-project",
  authController.protectedRoutes, 
  stackController.createNewProject,
  groupAdministrationController.getGroupAdministration
);

router.delete('/stacks/:stackId', 
  authController.protectedRoutes, 
  stackController.deleteStack
);

// Settings

router.get(
  "/settings",
  authController.protectedRoutes,
  userController.getUserById,
  settingsController.getSettings
);

// Update User
router.put(
  "/user/:id/role",
  authController.protectedRoutes,
  userController.updateUserRole
);

// Member routes
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

// Group routes
router.get(
  "/group-administration",
  authController.protectedRoutes,
  groupController.getAllGroups,
  groupAdministrationController.getGroupAdministration
);
router.post("/group-administration",
  authController.protectedRoutes, 
  groupController.createNewGroup
);

router.get(
  "/create-new-group",
  authController.protectedRoutes,
  createNewGroupController.getCreateNewGroup
);
router.post("/create-new-group", 
  authController.protectedRoutes, 
  groupController.createNewGroup
);

module.exports = router;
