const templateModel = require("../models/templateModel");

exports.getAllTempaltes = async (req, res, next) => {
  try {
    const templates = await templateModel.getAllTemplates();
    console.log("all templates from db:", templates);
    res.locals.templates = templates || [];
    next();
  } catch (error) {
    console.error(error);
    res.status(500).send("Internal Server Error");
  }
};

// exports.getTemplateById = async (req, res, next) => {
//   const templateId = req.user.roleId;
//   try {
//     const role = await roleModel.getRoleById(roleId);
//     //   if user is not found
//     if (!role) {
//       return res.status(404).send(`Role with id: ${roleId} is not found`);
//     }
//     // locals to make the role data available to the views
//     res.locals.role = role;

//     next();
//   } catch (error) {
//     console.error(`Error fetching role by ID: ${roleId}`, error);
//     return res.status(500).send("Internal Server Error");
//   }
// };
