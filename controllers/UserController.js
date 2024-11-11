const userModel = require("../models/userModel");

exports.getAllUsers = async (req, res, next) => {
  try {
    const users = await userModel.getAllUsers();
    console.log("Users data in controller:", users); 
    res.locals.users = users || [];
    next();
  } catch (error) {
    console.error(error);
    res.status(500).send("Internal Server Error");
  }
};

exports.getUserById = async (req, res, next) => {
  const userId = req.params.id;
  try {
    const user = await userModel.getUserById(userId);
    //   if user is not found
    if (!user) {
      return res.status(404).send(`User with id: ${userId} is not found`);
    }
    // locals to make the user data available to the views
    res.locals.user = user;
    // linje 27 skal slettes senere, er der kun for testing
    res.send(`User Info: ${JSON.stringify(user)}`);
    next();
  } catch (error) {
    console.error(`Error fetching user by ID: ${userId}`, error);
    return res.status(500).send("Internal Server Error");
  }
};

exports.createNewUser = async (req, res) => {
  const { firstname, lastname, email, password, role, group } = req.body;
  // Log the received data for debugging
  console.log("Received data:", req.body);

  // Convert role and groupId to integers
  const roleId = parseInt(role, 10);
  const groupId = parseInt(group, 10);

  // Validate that the roleId is valid
  if (![1, 2, 3].includes(roleId)) {
    console.log("Invalid role:", roleId);
    return res.status(400).send("Invalid role.");
  }
  // checking if its a valid ucl mail! - find ud af hvilken metode er bedst includes eller endsWith
  //   if (!email.includes("@edu.ucl.dk") || !email.includes("@ucl.dk")) {
  //     console.log("The entered email is not a verified UCL email.");
  //     return res.status(400).send("Invalid email: must be a UCL email.");
  //   }
  if (!email.endsWith("@edu.ucl.dk") && !email.endsWith("@ucl.dk")) {
    console.log("The entered email is not a verified UCL email.");
    return res.status(400).send("Invalid email: must be a UCL email.");
  }

  // error code 409 for error when creating/updating something.
  const existingUser = await userModel.checkUserByEmail(email);
  if (existingUser) {
    return res.status(409).send("User already exists with that email!");
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

// todo: Update and delete user missing:

