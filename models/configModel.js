const db = require("../config/db.js");
const dbConn = require("../config/db.js");
const jwt = require("jsonwebtoken");

exports.getConfig = async (config) => {
  try {
    const [rows] = await dbConn.query(
      "SELECT value FROM Configs WHERE config = ? LIMIT 1",
      [config]
    );

    if (rows.length > 0) {
      return rows[0];
    } else {
      return null;
    }
  } catch (error) {
    console.error("Error finding a token", error);
    throw error;
  }
};

exports.setConfig = async (config, value) => {
  try {
    await dbConn.query(
      "INSERT INTO Configs (config, value) VALUES (?, ?) ON DUPLICATE KEY UPDATE config = config, value = value",
      [config, value]
    );
  } catch (error) {
    console.error("Error creating a token", error);
    throw error;
  }
};
