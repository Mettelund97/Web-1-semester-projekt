const path = require("path");

exports.getGroupAdministration = (req, res) => {
  res.sendFile(path.join(__dirname, "../views", "groupAdministration.html"));
};
