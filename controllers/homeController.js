/* 
  exports.getHome = (req, res) => {
  res.render("index", {
    title: "Kubelab Dashboard",
  });
};

*/


exports.getHome = (req, res) => {
  res.render("index", {
    title: "Kubelab Dashboard",
    users: res.locals.users,
    stacks: res.locals.stacks || []
  });
};