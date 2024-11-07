const UserModel = require("../models/UserModel");

exports.getAddNewMember = (req, res) => {
  res.render("addNewMember", {
    title: "Add new member",
  });
};

exports.postAddNewMember = async (req, res) => {
  const { firstname, lastname, email, password, role } = req.body;

  // Log the received data for debugging
  console.log("Received data:", req.body);

  // Convert role to integer
  const roleId = parseInt(role, 10);

  // Validate that the roleId is valid (now including 1 for Superadmin)
  if (![1, 2, 3].includes(roleId)) { // Updated to include role 1 (Superadmin)
    console.log("Invalid role:", roleId);
    return res.status(400).send("Invalid role.");
  }

  try {
    // Hash password if necessary
    const result = await UserModel.addUser({
      firstName: firstname,
      lastName: lastname,
      email: email,
      password: password, // Hash this before inserting if necessary
      role: roleId, // Ensure role is passed as an integer
    });

    if (result.success) {
      return res.redirect("/"); // Adjust this to where you want to redirect
    } else {
      console.log("Error adding user:", result.message);
      return res.status(500).send("Error adding user.");
    }
  } catch (error) {
    console.error("Error adding user:", error);
    return res.status(500).send("Internal server error.");
  }
};


