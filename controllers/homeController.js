const configModel = require("../models/configModel");
exports.getHome = async (req, res) => {
  console.log("portainer-jwt:", await configModel.getConfig("PORTAINERTOKEN"));
  res.render("index", {
    title: "Kubelab Dashboard",
  });
};
