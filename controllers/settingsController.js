exports.getSettings = async (req, res) => {
  res.render("settings", {
    title: "Settings",
  });
};
