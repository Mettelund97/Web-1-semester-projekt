const roleModel = require("../models/roleModel");

exports.getAllRoles = async (req, res, next) => {
  try {
    const roles = await roleModel.getAllRoles();
    console.table(roles);
    res.locals.roles = roles || [];
    next();
  } catch (error) {
    console.error(error);
    res.status(500).send("Internal Server Error");
  }
};

exports.getRoleById = async (req, res, next) => {
  const roleId = req.user.roleId;
  try {
    const role = await roleModel.getRoleById(roleId);
    //   if user is not found
    if (!role) {
      return res.status(404).send(`Role with id: ${roleId} is not found`);
    }
    // locals to make the role data available to the views
    res.locals.role = role;

    next();
  } catch (error) {
    console.error(`Error fetching role by ID: ${roleId}`, error);
    return res.status(500).send("Internal Server Error");
  }
};
