const dbConn = require("../config/db.js");

exports.getAllGroups = async () => {
  try {
    const [rows, fields] = await dbConn.query(
      `SELECT id, name, createdAt FROM \`Groups\``
    );
    return rows;
  } catch (error) {
    console.error(error);
    return [];
  }
};
