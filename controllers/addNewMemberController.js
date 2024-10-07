const path = require("path");

exports.getAddNewMember = (req, res) => {
  res.sendFile(path.join(__dirname, "../views", "addNewMember.html"));
};
