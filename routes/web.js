const express = require("express");
// const authMiddleware = require("../middelware/authMiddelware");

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
// router.get("/user/:id", userController.getUserById);

// altid efterfulgt af "/urlen", så start med userController.getAllUsers hvis man skal bruge data fra user osv.
// og ikke homeController.getHome først.

router.get("/login", loginController.getLogin);
router.post("/login", loginController.login);

// Protected routes
// router.get(
//   "/",
//   authMiddleware,
//   userController.getAllUsers,
//   homeController.getHome,
//   (req, res) => {
//     res.send("This is a protected route for authenticated users.");
//   }
// );

router.get("/", userController.getAllUsers, homeController.getHome);
router.get("/settings", settingsController.getSettings);
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
  groupAdministrationController.getGroupAdministration
);
router.get("/create-new-group", createNewGroupController.getCreateNewGroup);
router.get("/start-new-project", startNewProjectController.getStartNewProject);

module.exports = router;
