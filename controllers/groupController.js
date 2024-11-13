const groupModel = require("../models/groupModel");

exports.createNewGroup = async (req, res) => {
  const { name } = req.body;

  console.log("Received data:", req.body);

  try {
    const result = await groupModel.createNewGroup({
      name: name
    });

    if (result.success) {
      console.log("Group created successfully with ID:", result.groupId);
      return res.redirect("/group-administration");
    } else {
      console.log("Group creation failed:", result.error);
      return res.status(400).json({ error: "Failed to create group" });
    }
   
  } catch (error) {
    console.error("Error creating group:", error);
    return res.status(500).json({ 
      error: "Internal server error",
      details: error.message 
    });
  }
};

// User assignment to groups
exports.assignUserToGroup = async (req, res) => {
  const { userId, groupId } = req.body;

  try {
    const result = await groupModel.assignUserToGroup(userId, groupId);
    
    if (result.success) {
      return res.json({ 
        success: true, 
        message: "User assigned to group successfully" 
      });
    } else {
      return res.status(400).json({ 
        success: false, 
        message: result.message 
      });
    }
  } catch (error) {
    console.error("Error assigning user to group:", error);
    return res.status(500).json({ 
      error: "Internal server error",
      details: error.message 
    });
  }
};

exports.getAllGroups = async (req, res, next) => {
  try {
    const groups = await groupModel.getAllGroups();
    res.locals.groups = groups || [];
    next();
  } catch (error) {
    console.error("Error fetching groups:", error);
    res.status(500).send("Internal Server Error");
  }
};