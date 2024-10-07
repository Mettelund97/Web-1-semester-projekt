const path = require("path");

exports.getLogin = (req, res) => {
  res.sendFile(path.join(__dirname, "../views", "login.html"));
};
