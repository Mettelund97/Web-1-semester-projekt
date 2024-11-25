const dbConn = require("../config/db.js");

exports.getAllGroups = async () => {
  try {
    // Get groups with member count
    const [groups] = await dbConn.query(`
      SELECT 
        g.id,
        g.name,
        COUNT(DISTINCT ug.userId) as memberCount
      FROM \`Groups\` g
      LEFT JOIN UserGroup ug ON g.id = ug.groupId
      GROUP BY g.id, g.name
      ORDER BY g.name ASC
    `);

    // Each group, get its members
    for (let group of groups) {
      const [members] = await dbConn.query(`
        SELECT 
          u.firstName,
          u.lastName
        FROM Users u
        INNER JOIN UserGroup ug ON u.id = ug.userId
        WHERE ug.groupId = ?
        ORDER BY u.firstName, u.lastName
      `, [group.id]);

      console.log(`Group ${group.name} members:`, members); 
      group.members = members || [];
    }

    console.log("All groups with members:", groups); 
    return groups;
  } catch (error) {
    console.error("Error fetching groups with members:", error);
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



// assign users to groups 
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
 
