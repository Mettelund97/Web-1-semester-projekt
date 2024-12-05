const userModel = require("../models/userModel");

exports.getAllUsers = async (req, res, next) => {
  try {
    const users = await userModel.getAllUsers();
    res.locals.users = users || [];
    next();
  } catch (error) {
    console.error(error);
    res.status(500).send("Internal Server Error");
  }
};

exports.getUserById = async (req, res, next) => {
  const userId = req.user.id;
  try {
    const user = await userModel.getUserById(userId);

    if (!user) {
      return res.status(404).send(`User with id: ${userId} is not found`);
    }
    res.locals.user = user;

    next();
  } catch (error) {
    console.error(`Error fetching user by ID: ${userId}`, error);
    return res.status(500).send("Internal Server Error");
  }
};

exports.createNewUser = async (req, res) => {
  const { firstname, lastname, email, password, role, group } = req.body;

  const roleId = parseInt(role, 10);
  const groupId = parseInt(group, 10);

  if (![1, 2, 3].includes(roleId)) {
    console.log("Invalid role:", roleId);
    return res.status(400).send("Invalid role.");
  }
  // checking if its a valid ucl mail! - find ud af hvilken metode er bedst includes eller endsWith
  //   if (!email.includes("@edu.ucl.dk") || !email.includes("@ucl.dk")) {
  //     console.log("The entered email is not a verified UCL email.");
  //     return res.status(400).send("Invalid email: must be a UCL email.");
  //   }

  if (!email.endsWith("@ucl.dk") && !email.endsWith("@edu.ucl.dk")) {
    console.log("The entered email is not a verified UCL email.");
    return res.status(400).send("Invalid email: must be a UCL email.");
  }

  const existingUser = await userModel.checkUserByEmail(email);
  if (existingUser) {
    return res.status(409).send("User already exists with that email!");
  }

  if (isNaN(groupId)) {
    console.log("Invalid group ID:", groupId);
    return res.status(400).send("Invalid group.");
  }

  try {
    const result = await userModel.createNewUser(
      {
        firstName: firstname,
        lastName: lastname,
        email: email,
        password: password,
        role: roleId,
      },
      groupId
    );

    if (result.success) {
      console.log("User created successfully with ID:", result.userId);
      return res.redirect("/");
    } else {
      console.log("Error adding user:", result.message);
      return res.status(500).send("Error adding user.");
    }
  } catch (error) {
    console.error("Error adding user:", error);
    return res.status(500).send("Internal server error.");
  }
};

exports.updateUserRole = async (req, res) => {
  const userId = req.params.id;
  const { roleId } = req.body;

  try {
    if (![1, 2, 3].includes(parseInt(roleId))) {
      return res.status(400).json({
        success: false,
        message: "Invalid role ID",
      });
    }

    const result = await userModel.updateUserRole(userId, roleId);

    if (result.success) {
      res.json({
        success: true,
        message: "Role updated successfully",
      });
    } else {
      res.status(500).json({
        success: false,
        message: result.message,
      });
    }
  } catch (error) {
    console.error("Error updating user role:", error);
    res.status(500).json({
      success: false,
      message: "Internal server error",
    });
  }
};
