const userModel = require("../models/UserModel");
// get all users
exports.getAllUsers = async (req, res, next) => {
  try {
    const users = await userModel.getAllUsers();
    // console.log("List of all users:");
    // console.table(users);
    res.locals.users = users || [];
    next();
  } catch (error) {
    console.error(error);
    res.status(500).send("Internal Server Error");
  }
};

// create new user with group and role:
exports.createNewUser = async (req, res) => {
  const { firstname, lastname, email, password, role, group } = req.body;

  // Log the received data for debugging
  console.log("Received data:", req.body);

  // Convert role and groupId to integers
  const roleId = parseInt(role, 10);
  const groupId = parseInt(group, 10); // Parse the group value

  // Validate that the roleId is valid
  if (![1, 2, 3].includes(roleId)) {
    console.log("Invalid role:", roleId);
    return res.status(400).send("Invalid role.");
  }

  // Validate that groupId is a valid number
  if (isNaN(groupId)) {
    console.log("Invalid group ID:", groupId);
    return res.status(400).send("Invalid group.");
  }

  try {
    // Add the user and assign them to the group
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
      // Redirect to the home page or another appropriate location after success
      console.log("User created successfully with ID:", result.userId);
      return res.redirect("/"); // Or send a success message if needed
    } else {
      console.log("Error adding user:", result.message);
      return res.status(500).send("Error adding user.");
    }
  } catch (error) {
    console.error("Error adding user:", error);
    return res.status(500).send("Internal server error.");
  }
};
