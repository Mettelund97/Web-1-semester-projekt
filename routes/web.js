const express = require("express");
const authService = require("../services/authService");
const loginController = require("../controllers/loginController");
const logoutController = require("../controllers/logoutController");
const homeController = require("../controllers/homeController");
const settingsController = require("../controllers/settingsController");
const addNewMemberController = require("../controllers/addNewMemberController");
const groupAdministrationController = require("../controllers/groupAdministrationController");
const createNewGroupController = require("../controllers/createNewGroupController");
const userController = require("../controllers/userController");
const roleController = require("../controllers/roleController");
const groupController = require("../controllers/groupController");
const membersController = require("../controllers/membersController");
const stackController = require("../controllers/stackController");
const templateController = require("../controllers/templateController");

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
  templateController.getAllTemplates,
  stackController.getStartNewProject
);

router.post(
  "/start-new-project",
  authService.protectedRoutes,
  templateController.getAllTemplates,
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
  // templateController.getAllTempaltes,
  authService.protectedRoutes,
  userController.getUserById,
  settingsController.getSettings
);

// Update User
router.put(
  "/user/:id/role",
  authService.authorizeRoles([1]),
  authService.protectedRoutes,
  userController.updateUserRole
);

// Member routes
router.get(
  "/members",
  authService.protectedRoutes,
  authService.authorizeRoles([1, 2]),
  userController.getAllUsers,
  roleController.getAllRoles,
  membersController.getMembers
);

router.get(
  "/add-new-member",
  authService.protectedRoutes,
  authService.authorizeRoles([1, 2]),
  roleController.getAllRoles,
  groupController.getAllGroups,
  addNewMemberController.getAddNewMember
);

router.post(
  "/add-new-member",
  authService.protectedRoutes,
  authService.authorizeRoles([1, 2]),
  userController.createNewUser
);

// Group routes
router.get(
  "/group-administration",
  authService.protectedRoutes,
  authService.authorizeRoles([1, 2]),
  groupController.getAllGroups,
  groupAdministrationController.getGroupAdministration
);

router.post(
  "/group-administration",
  authService.protectedRoutes,
  authService.authorizeRoles([1, 2]),
  groupController.createNewGroup
);

router.get(
  "/create-new-group",
  authService.protectedRoutes,
  authService.authorizeRoles([1, 2]),
  createNewGroupController.getCreateNewGroup
);

router.post(
  "/create-new-group",
  authService.protectedRoutes,
  authService.authorizeRoles([1, 2]),
  groupController.createNewGroup
);

module.exports = router;
