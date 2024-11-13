const dbConn = require("../config/db.js");


exports.getAllGroups = async () => {
  try {
    const [rows] = await dbConn.query(`
      SELECT 
        g.id,
        g.name,
        COUNT(ug.userId) as memberCount
      FROM \`Groups\` g
      LEFT JOIN UserGroup ug ON g.id = ug.groupId
      GROUP BY g.id, g.name
      ORDER BY g.name ASC
    `);
    return rows;
  } catch (error) {
    console.error("Error fetching groups:", error);
    return [];
  }
};


exports.createNewGroup = async (group) => {
  const { name } = group;

  try {
    const createGroupQuery =  `
      INSERT INTO \`Groups\` (\`name\`)
      VALUES (?)
    `;

    const [groupResult] = await dbConn.query(createGroupQuery, [name]);
    const groupId = groupResult.insertId;

    return {
      success: true,
      message: "Group created successfully",
      groupId: groupId
    };

  } catch (error) {
    console.error("Error creating group:", error);
    return { 
      success: false, 
      message: "Error creating group",
      error: error.message
    };
  }
};



// Method to assign users to groups later
exports.assignUserToGroup = async (userId, groupId) => {
  try {
    const userGroupQuery = `
      INSERT INTO UserGroup (userId, groupId)
      VALUES (?, ?)
    `;

    await dbConn.query(userGroupQuery, [userId, groupId]);
    
    return {
      success: true,
      message: "User assigned to group successfully"
    };
  } catch (error) {
    console.error("Error assigning user to group:", error);
    return {
      success: false,
      message: "Error assigning user to group",
      error: error.message
    };
  }
};
 
