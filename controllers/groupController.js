const groupModel = require("../models/groupModel");

exports.getAllGroups = async (req, res, next) => {
  try {
    const groups = await groupModel.getAllGroups();
    console.table(groups);
    res.locals.groups = groups || [];
    next();
  } catch (error) {
    console.error(error);
    res.status(500).send("Internal Server Error");
  }
};
