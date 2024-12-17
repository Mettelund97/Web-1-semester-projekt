const configModel = require("../models/configModel");

exports.getHome = async (req, res) => {
  res.render("index", {
    title: "Kubelab Dashboard",
    users: res.locals.users,
    stacks: res.locals.stacks || [],
  });
};
