const path = require("path");

exports.getSettings = (req, res) => {
  res.sendFile(path.join(__dirname, "../views", "settings.html"));
};
