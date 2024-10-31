const dbConn = require("../config/db.js");

// db function to get all users in the database.
exports.getAllUsers = async () => {
  try {
    const [rows, fields] = await dbConn.query(
      //   `SELECT id, firstName, lastName, email, password, expiredAt, RoleId FROM Users`
      // );
      `SELECT Users.id, Users.firstName, Users.lastName, Users.email, Users.password, Users.expiredAt, Roles.name AS roleName
    FROM Users
    JOIN Roles ON Users.RoleId = Roles.id`
    );
    return rows;
  } catch (error) {
    console.error(error);
    return [];
  }
};
