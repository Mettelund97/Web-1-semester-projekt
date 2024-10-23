// const path = require("path");

// exports.getHome = (req, res) => {
//   res.sendFile(path.join(__dirname, "../views", "index.html"));
// };

exports.getHome = (req, res) => {
  res.render("index", {
    title: "Kubelab Dashboard",
  });
};
