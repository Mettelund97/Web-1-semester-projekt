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

// let token = rows[0].value;
//       if (token) {
//         const decoded = jwt.decode(token);
//         console.log(decoded);
//         if (!decoded || !decoded.exp) {
//           console.error("Invalid token");
//           return null;
//         }

//         // make current time in seconds
//         const timeNow = Math.floor(Date.now() / 1000);
//         console.log("time in sec", timeNow);
//         if (decoded.exp < timeNow) {
//           console.log("Token has expired.");
//           return null;
//         }
//         if (!token) {
//           // create a new token?
//           // todo:
//           console.error("YOUR JWT-TOKEN IS EXPIRED!");
//         }

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
