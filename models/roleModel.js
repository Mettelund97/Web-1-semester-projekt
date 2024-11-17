const dbConn = require("../config/db.js");

exports.getAllRoles = async () => {
  try {
    const [rows, fields] = await dbConn.query(`SELECT id, type FROM Roles`);
    return rows;
  } catch (error) {
    console.error(error);
    return [];
  }
};

exports.getRoleById = async (id) => {
  try {
    const [rows] = await dbConn.query("SELECT * FROM Roles WHERE id = ?", [id]);
    if (rows.length > 0) {
      return rows[0];
    } else {
      console.log("No role found with the specified ID.");
      return null;
    }
  } catch (error) {
    console.error("Error fetching role by ID:", error);
    throw error;
  }
};
