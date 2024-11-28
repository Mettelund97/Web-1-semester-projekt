const dbConn = require("../config/db.js");
const jwt = require("jsonwebtoken");
// const { portainerAuthLogin } = require("../services/portainerService.js");
const portainerService = require("../services/portainerService");

exports.getConfig = async (configKey) => {
  try {
    const [rows] = await dbConn.query(
      "SELECT configValue FROM Configs WHERE configKey = ? LIMIT 1",
      [configKey]
    );

    if (rows.length > 0) {
      const token = rows[0].configValue;

      const decoded = jwt.decode(token);
      if (decoded && decoded.exp) {
        const currentTime = Math.floor(Date.now() / 1000);
        if (decoded.exp > currentTime) {
          return token;
        }
      }
      // const newToken = await portainerAuthLogin();
      const newToken = await portainerService.portainerAuthLogin();
      await exports.setConfig(configKey, newToken);
      return newToken;
    } else {
      // const newToken = await portainerAuthLogin();
      const newToken = await portainerService.portainerAuthLogin();
      await exports.setConfig(configKey, newToken);
      return newToken;
    }
  } catch (error) {
    console.error("Error finding a token", error);
    throw error;
  }
};

exports.setConfig = async (configKey, configValue) => {
  try {
    await dbConn.query(
      "INSERT INTO Configs (configKey, configValue) VALUES (?, ?) ON DUPLICATE KEY UPDATE configValue = ?",
      [configKey, configValue, configValue]
    );
  } catch (error) {
    console.error("Error creating a token", error);
    throw error;
  }
};
