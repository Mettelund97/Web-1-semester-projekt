const roleModel = require("../models/roleModel");

exports.getAllRoles = async (req, res, next) => {
  try {
    const roles = await roleModel.getAllRoles();
    // console.log("List of all roles:");
    console.table(roles);
    res.locals.roles = roles || [];
    next();
  } catch (error) {
    console.error(error);
    res.status(500).send("Internal Server Error");
  }
};
