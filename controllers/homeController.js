exports.getHome = (req, res) => {
  res.render("index", {
    title: "Kubelab Dashboard",
  });
};
