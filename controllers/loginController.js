exports.getLogin = (req, res) => {
  res.render("login", {
    title: "Login",
    hideSidebar: true, //variable til at bestemme om nav/sidebar skal være synlig eller ej.
  });
};
