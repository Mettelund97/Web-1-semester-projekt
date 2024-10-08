const path = require("path");

exports.getStartNewProject = (req, res) => {
  res.sendFile(path.join(__dirname, "../views", "startNewProject.html"));
};
