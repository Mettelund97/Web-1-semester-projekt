exports.getSettings = (req, res) => {
  res.render("settings", {
    title: "Settings",
  });
};