const mysql = require("mysql2");
require("dotenv").config();

// try {
//   const pool = mysql.createPool({
//     host: "localhost",
//     user: "root",
//     password: "root",
//     database: "KubeLabDB",
//   });
//   module.exports = pool.promise();
// } catch (error) {
//   console.log(error);
// }

try {
  const pool = mysql.createPool({
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME,
  });
  module.exports = pool.promise();
} catch (error) {
  console.log(error);
}
