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
      const token = rows[0].value;

      const decoded = jwt.decode(token);
      if (decoded && decoded.exp) {
        const currentTime = Math.floor(Date.now() / 1000);
        if (decoded.exp > currentTime) {
          return token;
        }
      }

      const newToken = await fetchPortainerJWT();
      await this.setConfig(config, newToken);
      return newToken;
    } else {
      const newToken = await fetchPortainerJWT();
      await this.setConfig(config, newToken);
      return newToken;
    }
  } catch (error) {
    console.error("Error finding a token", error);
    throw error;
  }
};

exports.setConfig = async (config, value) => {
  try {
    await dbConn.query(
      "INSERT INTO Configs (config, value) VALUES (?, ?) ON DUPLICATE KEY UPDATE value = ?",
      [config, value, value]
    );
  } catch (error) {
    console.error("Error creating a token", error);
    throw error;
  }
};