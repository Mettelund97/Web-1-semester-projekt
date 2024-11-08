const dbConn = require("../config/db.js");

  exports.getAllUsers = async () => {
  try {
  const [rows, fields] = await dbConn.query(
  // `SELECT id, firstName, lastName, email, password, expiredAt, RoleId FROM Users`
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

// Add a single user to the database
exports.addUser = async (user) => {
  const { firstName, lastName, email, password, role } = user;

  try {
    // Make sure to hash the password only once using SHA2 directly in the query
    const query = `
      INSERT INTO Users (firstName, lastName, email, password, RoleId)
      VALUES (?, ?, ?, SHA2(?, 256), ?)
    `;
    
    // Execute the query with parameters
    const result = await dbConn.query(query, [firstName, lastName, email, password, role]);

    return { success: true, message: 'User added successfully' };
  } catch (error) {
    console.error("Error adding user:", error);
    return { success: false, message: 'Error adding user' };
  }
};







