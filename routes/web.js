const express = require("express");
const authService = require("../services/authService");
const authController = require("../controllers/authController");
const loginController = require("../controllers/loginController");
const logoutController = require("../controllers/logoutController");
const homeController = require("../controllers/homeController");
const settingsController = require("../controllers/settingsController");
const addNewMemberController = require("../controllers/addNewMemberController");
const groupAdministrationController = require("../controllers/groupAdministrationController");
const createNewGroupController = require("../controllers/createNewGroupController");
const userController = require("../controllers/UserController");
const roleController = require("../controllers/roleController");
const groupController = require("../controllers/groupController");
const membersController = require("../controllers/membersController");
const stackController = require("../controllers/stackController");

const router = express.Router();

router.get("/login", loginController.getLogin);
router.post("/login", loginController.login);
router.get("/logout", logoutController.logout);

// Alt herunder er beskyttet routes vha: "protectedRoutes"

//Projects
router.get(
  "/",
  authService.protectedRoutes,
  userController.getAllUsers,
  stackController.getAllStacks,
  homeController.getHome
);

router.get(
  "/start-new-project",
  authService.protectedRoutes,
  stackController.getStartNewProject
);

router.post(
  "/start-new-project",
  authService.protectedRoutes,
  stackController.createNewProject,
  groupAdministrationController.getGroupAdministration
);

router.post("/stacks/:stackId/start", stackController.startStack);
router.post("/stacks/:stackId/stop", stackController.stopStack);

router.delete(
  "/stacks/:stackId",
  authService.protectedRoutes,
  stackController.deleteStack
);

// Settings

router.get(
  "/settings",
  authService.protectedRoutes,
  userController.getUserById,
  settingsController.getSettings
);

// Update User
router.put(
  "/user/:id/role",
  authService.protectedRoutes,
  userController.updateUserRole
);

// Member routes
router.get(
  "/members",
  authService.protectedRoutes,
  authService.authorizeRole(1),
  userController.getAllUsers,
  roleController.getAllRoles,
  membersController.getMembers
);

router.get(
  "/add-new-member",
  authService.protectedRoutes,
  authService.authorizeRole(1),
  roleController.getAllRoles,
  groupController.getAllGroups,
  addNewMemberController.getAddNewMember
);

router.post(
  "/add-new-member",
  authService.protectedRoutes,
  authService.authorizeRole(1),
  userController.createNewUser
);

// Group routes
router.get(
  "/group-administration",
  authService.protectedRoutes,
  groupController.getAllGroups,
  groupAdministrationController.getGroupAdministration
);
router.post(
  "/group-administration",
  authService.protectedRoutes,
  groupController.createNewGroup
);

router.get(
  "/create-new-group",
  authService.protectedRoutes,
  createNewGroupController.getCreateNewGroup
);
router.post(
  "/create-new-group",
  authService.protectedRoutes,
  groupController.createNewGroup
);

module.exports = router;
