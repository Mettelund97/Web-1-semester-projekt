const dbConn = require("../config/db.js");
// getting all users from the database
exports.getAllUsers = async () => {
  try {
    const [rows, fields] = await dbConn.query(
      //   `SELECT id, firstName, lastName, email, password, expiredAt, roleId FROM Users`
      // );
      `SELECT Users.id, Users.firstName, Users.lastName, Users.email, Users.password, Users.expiredAt, Users.RoleId,
    Roles.type AS roleName
    FROM Users
    JOIN Roles ON Users.RoleId = Roles.id`
    );
    return rows;
  } catch (error) {
    console.error(error);
    return [];
  }
};

// create a single user to the database with group and role
exports.createNewUser = async (user, groupId) => {
  const { firstName, lastName, email, password, role } = user;

  try {
    // Step 1: Insert the new user into the Users table
    const userQuery = `
      INSERT INTO Users (firstName, lastName, email, password, roleId)
      VALUES (?, ?, ?, SHA2(?, 256), ?)
    `;

    // Execute the query with parameters
    const [userResult] = await dbConn.query(userQuery, [
      firstName,
      lastName,
      email,
      password,
      role,
    ]);

    // Get the newly created user's ID
    const userId = userResult.insertId;

    // Step 2: Insert into the UserGroup table to link user with the group
    const groupQuery = `
      INSERT INTO UserGroup (userId, groupId)
      VALUES (?, ?)
    `;
    await dbConn.query(groupQuery, [userId, groupId]);

    return {
      success: true,
      message: "User added successfully and assigned to group",
      userId: userId,
    };
  } catch (error) {
    console.error("Error adding user:", error);
    return { success: false, message: "Error adding user" };
  }
};
