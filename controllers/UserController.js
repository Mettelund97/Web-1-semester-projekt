const UserModel = require("../models/UserModel");

exports.getAllUsers = async (req, res, next) => {
  try {
    const users = await UserModel.getAllUsers();
    console.log("List of all users:");
    console.table(users);
    res.locals.users = users || [];
    next();
  } catch (error) {
    console.error(error);
    res.status(500).send("Internal Server Error");
  }
};
