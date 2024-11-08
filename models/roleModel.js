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
