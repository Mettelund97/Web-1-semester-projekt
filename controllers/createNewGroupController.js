const path = require("path");

exports.getCreateNewGroup = (req, res) => {
  res.sendFile(path.join(__dirname, "../views", "createNewGroup.html"));
};
